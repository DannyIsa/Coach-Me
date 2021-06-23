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

trainee.post("/request/send/:traineeId", (req, res) => {
  const { coachId, traineeName, content } = req.body;
  const { traineeId } = req.params;
  if (!Number(coachId) || !Number(traineeId)) {
    return res.status(400).send("Invalid ID");
  }
  if (!content || !traineeName) {
    return res.status(400).send("Invalid Content");
  }
  models.CoachRequest.create({
    trainee_id: traineeId,
    coach_id: coachId,
    trainee_name: traineeName,
    content,
  })
    .then((res) => {
      res.status(201).send(res);
    })
    .catch(async (err) => {
      if (err.message === "Validation error") {
        const request = await models.CoachRequest.findOne({
          where: { trainee_id: traineeId },
        });
        if (!request) return res.status(404).send("No Trainee With That Id");
        request
          .update({ coach_id: coachId, content })
          .then(() => {
            return res.status(201).send(request);
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

trainee.get("/request/show/:traineeId", async (req, res) => {
  const { traineeId } = req.params;
  const trainee = await models.Trainee.findOne({ where: { id: traineeId } });
  if (!trainee) return res.status(404).send("No Matching Id");
  const request = await trainee.getCoachRequest();
  if (!request) return res.status(200).send({ coach_id: 0 });
  return res.status(200).send(request);
});
module.exports = trainee;
