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
const coach = Router();
coach.use(express.json());

coach.put("/request/accept/:coachId", (req, res) => {
  const { coachId } = req.params;
  const { traineeId } = req.query;
  if (!Number(coachId) || !Number(traineeId))
    return res.status(400).send("Invalid ID");
  models.Trainee.update({ coach_id: coachId }, { where: { id: traineeId } })
    .then((data) => {
      if (!data[0]) return res.status(404).send("No Client With That Id");
      models.CoachRequest.destroy({
        where: { id: traineeId, coach_id: coachId },
      })
        .then(() => {
          res.status(200).send("Request Accepted");
        })
        .catch((err) => res.status(400).send(err.message));
    })
    .catch((err) => res.status(400).send(err.message));
});

coach.delete("/request/decline/:coachId", (req, res) => {
  const { coachId } = req.params;
  const { traineeId } = req.query;
  if (!Number(coachId) || !Number(traineeId))
    return res.status(400).send("Invalid ID");
  models.CoachRequest.destroy({
    where: { trainee_id: traineeId, coach_id: coachId },
  })
    .then((data) => {
      console.log(data);
      if (!data) return res.status(404).send("No Client With That Id");
      res.status(200).send("Request Declined");
    })
    .catch((err) => res.status(400).send(err.message));
});
coach.post("/exercise-set/new/:coachId", (req, res) => {});

coach.put("/exercise-set/append/:coachId", (req, res) => {});

coach.post("/workout/new/:coachId", (req, res) => {});

coach.put("/workout/append/:coachId", (req, res) => {});

module.exports = coach;
