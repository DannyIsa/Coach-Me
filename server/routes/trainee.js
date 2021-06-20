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
const logs = require("./logs");
const trainee = Router();

trainee.use(express.json());
trainee.use("/logs", logs);
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

trainee.post("/meal/add", async (req, res) => {
  const { traineeId, mealId } = req.body;
  if (!Number(mealId) || !Number(traineeId))
    return res.status(400).send("Invalid ID");
  const trainee = await models.Trainee.findOne({ where: { id: traineeId } });
  if (!trainee) return res.status(404).send("No Trainee Found");
  const meal = await models.Meal.findOne({ where: { id: mealId } });
  if (!meal) return res.status(404).send("No Meals Found");

  trainee
    .addMeal(meal)
    .then(() => res.status(201).send("Meal Added To Trainee"))
    .catch((err) => res.status(400).send(err.message));
});

trainee.get("/meal/show/:traineeId", async (req, res) => {
  const { traineeId } = req.params;
  let { sort } = req.query;
  let { order } = req.query;
  if (
    !sort ||
    (sort !== "name" &&
      sort !== "calories" &&
      sort !== "carbs" &&
      sort !== "protein" &&
      sort !== "fats" &&
      sort !== "created_at")
  )
    sort = "name";
  if (!order || (order !== "DESC" && order !== "ASC")) order = "ASC";
  const trainee = await models.Trainee.findAll({
    where: { id: traineeId },
    include: { model: models.Meal },
    order: [[models.Meal, sort, order]],
  });
  if (trainee.length === 0 || !trainee)
    return res.status(404).send("No Trainee Found");

  const { Meals } = trainee[0];
  if (meals.length === 0 || !meals)
    return res.status(404).send("No Meals Found");
  res.status(200).send(Meals);
});

module.exports = trainee;
