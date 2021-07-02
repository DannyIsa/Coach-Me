const models = require("../models");
const { Op, where } = require("sequelize");
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

async function updateOrCreate(model, where, newItem) {
  // First try to find the record
  const todayLog = await model.findOne({
    where: where,
  });
  if (!todayLog) {
    // Item not found, create a new one
    const item = await model.create(newItem);
    return { item, status: 201 };
  }
  // Found an item, update it
  const item = await model.update(newItem, { where });
  if (!item) {
    return { item: "couldnt update", status: 400 };
  }
  const newLog = await model.findOne({
    where: where,
  });

  return { item: newLog, status: 201 };
}

logs.post("/measure/add", async (req, res) => {
  const {
    id,
    weight,
    height,
    chestPerimeter,
    hipPerimeter,
    bicepPerimeter,
    thighPerimeter,
    waistPerimeter,
  } = req.body || null;

  const trainee = await models.Trainee.findOne({ where: { id } });

  if (!id || !trainee) {
    return res.status(404).send("Invalid ID");
  }
  if (
    !weight &&
    !height &&
    !chestPerimeter &&
    !hipPerimeter &&
    !bicepPerimeter &&
    !thighPerimeter &&
    !waistPerimeter
  ) {
    return res.status(404).send("Must send measure logs");
  }

  updateOrCreate(
    models.MeasureLog,
    {
      created_at: {
        [Op.gt]: new Date().setHours(0, 0, 0, 0),
        [Op.lt]: new Date(),
      },
    },
    {
      trainee_id: id,
      weight,
      height,
      chest_perimeter: chestPerimeter,
      hip_perimeter: hipPerimeter,
      bicep_perimeter: bicepPerimeter,
      thigh_perimeter: thighPerimeter,
      waist_perimeter: waistPerimeter,
    }
  )
    .then(async (data) => {
      const { height, weight } = data.item;
      await trainee.update({ height, weight });
      return res.status(data.status).send(data.item);
    })
    .catch((err) => {
      return res.status(err.status).send("Couldn't update logs");
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
    return res.status(400).send("Invalid ID");
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
    return res.status(400).send("Invalid ID");
  }

  const traineeWorkoutsLog = await models.WorkoutLog.findAll({
    where: { trainee_id: traineeId },
  });

  const workoutId = traineeWorkoutsLog.map((e) => e.workout_id);

  const workoutOfThisLog = await models.Workout.findAll({
    where: { id: workoutId },
  });

  res.status(201).json(workoutOfThisLog);
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
