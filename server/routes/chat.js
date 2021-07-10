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
const chat = Router();
chat.use(express.json());

chat.get("/:traineeId/:coachId", async (req, res) => {
  const { traineeId, coachId } = req.params;
  if (!coachId || !traineeId)
    return res.status(400).send("Must send trainee and coach id");
  res.status(200).send({ traineeId, coachId });
});

chat.post("/:traineeId/:coachId", async (req, res) => {
  const { traineeId, coachId } = req.params;
  if (!coachId || !traineeId)
    return res.status(400).send("Must send trainee and coach id");
  res.status(200).send({ traineeId, coachId });
});

module.exports = chat;
