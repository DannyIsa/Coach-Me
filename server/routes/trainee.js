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

trainee.get("/workout/show/one/:workoutId", async (req, res) => {
  const { coachId } = req.query;
  const { traineeId } = req.query;
  const { workoutId } = req.params;
  const trainee = await models.Trainee.findOne({
    where: { id: traineeId, coach_id: coachId },
  });
  if (!trainee) return res.status(404).send("No Matching Id");
  const workout = await models.Workout.findOne({ where: { id: workoutId } });
  if (!workout) res.status(404).send("Workout Not Found");

  const exercises = await workout.getExerciseSets();
  if (!exercises) return res.status(404).send("Invalid Workout");
  const exercisesWithImages = await Promise.all(
    exercises.map(async (exercise) => {
      let { image } = await exercise.getExercise({ attributes: ["image"] });
      return { ...exercise.toJSON(), image };
    })
  );
  const data = { ...workout.toJSON(), exercises: exercisesWithImages };
  delete data.ExerciseSets;
  res.status(200).send(data);
});

trainee.get("/coach/show/:traineeId", async (req, res) => {
  const { traineeId } = req.params;
  if (!traineeId) return res.status(400).send("Id Required");
  const trainee = await models.Trainee.findOne({ where: { id: traineeId } });
  if (!trainee) return res.status(404).send("Trainee Not Found");
  const coach = await trainee.getCoach();
  return res.status(200).send(coach);
});

trainee.get("/coach/expertise", async (req, res) => {
  const tags = await models.Coach.findAll({
    attributes: [
      [Sequelize.fn("DISTINCT", Sequelize.col("expertise")), "expertise"],
    ],
  });
  if (!tags) return res.status(200).send([]);
  return res.status(200).send(tags.map((item) => item.expertise));
});
module.exports = trainee;
