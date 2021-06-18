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
  Object.values(client.toJSON()).map((value) => {
    if (!value && value !== 0) valid = false;
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
  if (coach) return res.send({ valid: checkValid(coach), type: "coach" });
  const trainee = await models.Trainee.findOne({ where: { email } });
  if (trainee) return res.send({ valid: checkValid(trainee), type: "trainee" });
  res.status(404).send("No client with that email");
});

user.post("/details/:email", (req, res) => {});
module.exports = user;
