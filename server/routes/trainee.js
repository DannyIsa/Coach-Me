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
const trainee = Router();
trainee.use(express.json());

trainee.post("/send-request/:traineeId", (req, res) => {
  const { coachId } = req.query;
  const { traineeId } = req.params;
  if (!Number(coachId) || !Number(traineeId))
    return res.status(400).send("Invalid ID");
  models.CoachRequest.create({ trainee_id: traineeId, coach_id: coachId })
    .then(() => {
      res.status(201).send("Request Sent");
    })
    .catch((err) => {
      if (err.message === "Validation error") {
        models.CoachRequest.update(
          { coach_id: coachId },
          { where: { trainee_id: traineeId } }
        )
          .then((data) => {
            if (!data[0])
              return res.status(404).send("No Trainee With That Id");
            return res.status(201).send("Request Updated");
          })
          .catch((err) => {
            return res.status(400).send(err.message);
          });
      } else res.status(400).send(err.message);
    });
});

trainee.post("/log/workout/add:clientId", (req, res) => {});

trainee.post("/log/measure/add:clientId", (req, res) => {});

trainee.post("/log/diet/add:clientId", (req, res) => {});

trainee.get("/log/workout/show:clientId", (req, res) => {});

trainee.get("/log/measure/show:clientId", (req, res) => {});

trainee.get("/log/diet/show:clientId", (req, res) => {});

trainee.post("/meal/add/:clientId", (req, res) => {});

trainee.get("/meal/show/:clientId", (req, res) => {});

module.exports = trainee;
