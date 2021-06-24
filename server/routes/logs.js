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
const logs = Router();
logs.use(express.json());

logs.post("/workout/add", (req, res) => {});

logs.post("/measure/add", async (req, res) => {
  const {
    id: traineeId,
    weight,
    chestPerimeter,
    hipPerimeter,
    bicepPerimeter,
    thighPerimeter,
    waistPerimeter,
  } = req.body || null;
  const trainee = await models.Trainee.findOne({ where: { id: traineeId } });
  if (!traineeId || !trainee) {
    return res.status(404).send("Invalid ID");
  }
  if (
    !weight &&
    !chestPerimeter &&
    !hipPerimeter &&
    !bicepPerimeter &&
    !thighPerimeter &&
    !waistPerimeter
  ) {
    return res.status(404).send("Must send measure logs");
  }

  models.MeasureLog.create({
    id: traineeId,
    weight,
    "chest-perimeter": chestPerimeter,
    "hip-perimeter": hipPerimeter,
    "bicep-perimeter": bicepPerimeter,
    "thigh-perimeter": thighPerimeter,
    "waist-perimeter": waistPerimeter,
  }).then(() => {
    res.status(201).send(`${traineeId} measure logs added`);
  });
});

logs.post("/diet/add", async (req, res) => {
  const {
    id: traineeId,
    totalCalories,
    usedCalories,
    totalProtein,
    usedProtein,
    totalCarbs,
    usedCarbs,
    totalFat,
    usedFat,
  } = req.body || null;
  const trainee = await models.Trainee.findOne({ where: { id: traineeId } });
  if (!traineeId || !trainee) {
    return res.status(404).send("Invalid ID");
  }
  if (!totalCalories || !usedCalories) {
    return res.status(404).send("Must sand total and used caloriess");
  }

  models.DietLog.create({
    id: traineeId,
    "total-calories": totalCalories,
    "used-calories": usedCalories,
    "total-protein": totalProtein,
    "used-protein": usedProtein,
    "total-carbs": totalCarbs,
    "used-carbs": usedCarbs,
    "total-fat": totalFat,
    "used-fat": usedFat,
  }).then(() => {
    res.status(201).send(`${traineeId} food log added`);
  });
});

logs.get("/workout/show/:traineeId", async (req, res) => {
  const { traineeId } = req.params;
  const trainee = await models.Trainee.findOne({ where: { id: traineeId } });

  if (!traineeId || !trainee) {
    return res.status(404).send("Invalid ID");
  }

  const traineeWorkoutsLog = await models.WorkoutLog.findAll({
    where: { trainee_id: traineeId },
  });
  const workoutId = traineeWorkoutsLog.workout_id;
  const workoutOfThisLog = await models.Workout.findOne({
    where: { id: workoutId },
  });
  workoutOfThisLog.time = traineeWorkoutsLog.time;

  res.status(201).send(workoutOfThisLog);
});

logs.get("/measure/show/:traineeId", async (req, res) => {
  const { traineeId } = req.params;
  const trainee = await models.Trainee.findOne({ where: { id: traineeId } });

  if (!traineeId || !trainee) {
    return res.status(404).send("Invalid ID");
  }

  const traineeMeasureLog = await models.MeasureLog.findAll({
    where: { trainee_id: traineeId },
  });

  res.status(201).send(traineeMeasureLog);
});

logs.get("/diet/show/:traineeId", async (req, res) => {
  const { traineeId } = req.params;
  const trainee = await models.Trainee.findOne({ where: { id: traineeId } });

  if (!traineeId || !trainee) {
    return res.status(404).send("Invalid ID");
  }

  const traineeDietLog = await models.DietLog.findOne({
    where: { trainee_id: traineeId },
  });

  res.status(201).send(traineeDietLog);
});

module.exports = logs;
