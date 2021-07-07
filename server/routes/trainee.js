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
    .then((data) => {
      req.io.emit("request received", coachId);
      res.status(201).send(data);
    })
    .catch(async (err) => {
      if (
        err === "Validation error" ||
        err.name === "SequelizeUniqueConstraintError"
      ) {
        const request = await models.CoachRequest.findOne({
          where: { trainee_id: traineeId },
        });
        if (!request) return res.status(404).send("No Trainee With That Id");
        request
          .update({ coach_id: coachId, content })
          .then(() => {
            req.io.emit("request received", coachId);
            return res.status(201).send(request);
          })
          .catch((err) => {
            return res.status(400).send(err);
          });
      } else {
        res.status(400).send(err);
      }
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
    .catch((err) => res.status(400).send(err));
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
    return res.status(404).send("No Meal Found");
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

trainee.get("/workouts/show/:coachId", async (req, res) => {
  const { coachId } = req.params;
  const { traineeId } = req.query;
  const trainee = await models.Trainee.findOne({
    where: { id: traineeId, coach_id: coachId },
  });
  if (!trainee) return res.status(404).send("No Matching Id");
  const calendars = await trainee.getCalendars();
  if (!calendars) return res.status(200).send([]);
  const workouts = await Promise.all(
    calendars.map(async (calendar) => {
      let workout = await calendar.getWorkout();
      if (!workout) return { calendar };
      let exercises = await workout.getExerciseSets();
      let item = { ...workout.toJSON(), exercises, day: calendar.day };
      delete item.ExerciseSets;
      return item;
    })
  );
  if (!workouts) res.status(200).send([]);
  res.status(200).send(workouts);
});

trainee.get("/workout/show/:workoutId", async (req, res) => {
  console.log(req.params, "RRRRR");
  const { workoutId } = req.params;
  if (!workoutId) {
    return res.status(400).send("must send id");
  }
  const workout = await models.Workout.findOne({
    where: { id: workoutId },
  });
  if (!workout) {
    return res.status(404).send("workout not found");
  }
  res.status(201).send(workout);
});

module.exports = trainee;
