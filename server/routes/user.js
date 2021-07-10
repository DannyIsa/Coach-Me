const models = require("../models");
const { Op } = require("sequelize");
const Sequelize = require("sequelize");
require("dotenv").config();
const sequelize = new Sequelize(
  process.env.SQL_DATA_BASE,
  process.env.SQL_USERNAME,
  process.env.SQL_PASSWORD,
  {
    host: process.env.SQL_HOST,
    dialect: "mysql",
  }
);
const express = require("express");
const { Router } = require("express");
const user = Router();
user.use(express.json());

function checkValid(client) {
  let valid = true;
  console.log(client, "fffffff");
  const values = Object.values(client);
  if (values === []) return false;
  values.map((value) => {
    if (!value && value !== 0) {
      valid = false;
    }
  });
  return valid;
}

user.post("/register", async (req, res) => {
  const { type } = req.query;
  const { email } = req.body;
  if (type !== "Coach" && type !== "Trainee") {
    return res.status(400).send("Invalid");
  }

  const trainee = await models.Trainee.findOne({ where: { email } });
  const coach = await models.Coach.findOne({ where: { email } });
  if (trainee || coach) return res.status(200).send("User already exists");

  let query = { email };
  if (type === "Trainee") query.coach_id = 0;
  models[type]
    .create(query)
    .then(() => {
      res.status(201).send(`${type} Registered`);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

user.get("/login/:email", async (req, res) => {
  const { email } = req.params;

  const trainee = await models.Trainee.findOne({ where: { email: email } });

  if (trainee) {
    return res.status(200).send(trainee);
  }
  const coach = await models.Coach.findOne({ where: { email: email } });
  if (coach) {
    return res.status(200).send(coach);
  }
  return res.status(400).send(`${email} is not registered`);
});

user.get("/check/:email", async (req, res) => {
  const { email } = req.params;
  if (!email) return res.status(400).send("Invalid email");
  const trainee = await models.Trainee.findOne({ where: { email: email } });
  if (trainee) {
    return res.status(200).send({
      details: trainee.toJSON(),
      valid: checkValid(trainee.toJSON()),
      type: "Trainee",
    });
  }
  const coach = await models.Coach.findOne({ where: { email: email } });
  if (coach) {
    return res.status(200).send({
      details: coach.toJSON(),
      valid: checkValid(coach.toJSON()),
      type: "Coach",
    });
  }

  res.status(404).send("No Client With That Email");
});

user.put("/details/:id", (req, res) => {
  const { id } = req.params;
  const { type, obj } = req.body;
  console.log(obj, "obj");
  let query;
  if ((type !== "Coach" && type !== "Trainee") || !obj) {
    return res.status(400).send("Invalid Client");
  }
  if (!Number(obj.phone_number))
    return res.status(400).send("Invalid Phone Number");
  if (type === "Coach") {
    query = {
      name: obj.name,
      birthdate: obj.birthdate,
      gender: obj.gender,
      phone_number: obj.phone_number,
      image: obj.image,
      avg_rating: 0,
      rating_count: 0,
      online_coaching: obj.online_coaching,
      city: obj.city,
      expertise: obj.expertise,
    };
  } else if (type === "Trainee") {
    query = {
      name: obj.name,
      birthdate: obj.birthdate,
      phone_number: obj.phone_number,
      gender: obj.gender,
      height: obj.height,
      weight: obj.weight,
      image: obj.image,
      daily_calorie_goal: 0,
      activity_level: obj.activity_level,
    };
  }

  if (!checkValid(query)) return res.status(400).send("Invalid Details");

  models[type]
    .update(query, { where: { id } })
    .then((data) => {
      if (!data[0]) return res.status(404).send(`No Client With id ${id}`);
      res.status(201).send(`${type} ${query.name} Updated`);
    })
    .catch((err) => res.status(400).send(err));
});

user.put("/image/add/:userId", async (req, res) => {
  const { userId } = req.params;
  const { image } = req.body;
  const coach = await models.Coach.findOne({ where: { id: userId } });
  const trainee = await models.Trainee.findOne({ where: { id: userId } });

  if (coach) {
    coach
      .update({
        image,
      })
      .then((data) => res.status(201).send(data))
      .catch((err) => res.status(400).send(err));
  } else if (trainee) {
    trainee
      .update({
        image,
      })
      .then((data) => res.status(201).send(data))
      .catch((err) => res.status(400).send(err));
  } else if (!coach && !trainee)
    return res.status(404).send("No Matching User");
});

module.exports = user;
