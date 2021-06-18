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
  const values = Object.values(client);
  if (values === []) return false;
  values.map((value) => {
    if (!value && value !== 0) {
      valid = false;
    }
  });
  return valid;
}

user.post("/register", (req, res) => {
  const { type } = req.query;
  const { email } = req.body;
  if (type !== "Coach" && type !== "Trainee")
    return res.status(400).send("Invalid");
  let query = { email };
  if (type === "Trainee") query.coach_id = 0;
  models[type]
    .create(query)
    .then(() => {
      res.status(201).send(`${type} Registered`);
    })
    .catch((err) => {
      res.status(400).send(err.message);
    });
});

user.get("/check/:email", async (req, res) => {
  const { email } = req.params;
  const coach = await models.Coach.findOne({ where: { email } });
  if (coach)
    return res.send({ valid: checkValid(coach.toJSON()), type: "coach" });
  const trainee = await models.Trainee.findOne({ where: { email } });
  if (trainee)
    return res.send({ valid: checkValid(trainee.toJSON()), type: "trainee" });
  res.status(404).send("No Client With That Email");
});

user.post("/details/:email", (req, res) => {
  const { email } = req.params;
  console.log(email);
  const { type, obj } = req.body;
  let query;

  if ((type !== "Coach" && type !== "Trainee") || !obj)
    return res.status(400).send("Invalid Client");

  if (type === "Coach")
    query = {
      name: obj.name,
      address: obj.address,
      phone_number: obj.phone_number,
      rating: 0,
    };
  else if (type === "Trainee")
    query = {
      name: obj.name,
      birthdate: obj.birthdate,
      gender: obj.gender,
      height: obj.height,
      weight: obj.weight,
    };
  if (!checkValid(query)) return res.status(400).send("Invalid Details");
  models[type]
    .update(query, { where: { email } })
    .then((data) => {
      if (!data[0])
        return res.status(404).send(`No Client With Email ${email}`);
      res.status(201).send(`${type} ${query.name} Updated`);
    })
    .catch((err) => res.status(400).send(err.message));
});

module.exports = user;
