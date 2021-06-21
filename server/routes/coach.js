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

coach.get("/details/:id", async (req, res) => {
  const { id } = req.params;
  if (!Number(id)) return res.status(400).send("Invalid ID");
  const coach = await models.Coach.findOne({ where: { id } });
  if (!coach) return res.status(404).send("No Matching Id");
  return res.status(200).send(coach);
});

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
coach.post("/exercise-set/new", async (req, res) => {
  const { name, min_reps, max_reps, sets, added_weight, rest } = req.body;
  models.ExerciseSet.create({
    name,
    min_reps,
    max_reps,
    sets,
    added_weight,
    rest,
  })
    .then(() => res.status(201).send("Set Added"))
    .catch((err) => res.status(400).send(err.message));
});

coach.post("/exercise-set/append", async (req, res) => {
  const { exercise_id, workout_id } = req.body;
  if (!Number(exercise_id) || !Number(workout_id))
    return res.status(400).send("Invalid ID");
  const exercise = await models.ExerciseSet.findOne({
    where: { id: exercise_id },
  });
  if (!exercise) return res.status(404).send("No Exercise Found");
  const workout = await models.Workout.findOne({ where: { id: workout_id } });
  if (!workout) return res.status(404).send("No Workout Found");

  exercise
    .addWorkout(workout)
    .then(() => res.status(201).send("Exercise Added To Workout"))
    .catch((err) => res.status(400).send(err.message));
});

coach.post("/workout/new/:coachId", async (req, res) => {
  const { coachId } = req.params;
  const { name, sets, exercise_ids } = req.body;
  if (!Number(coachId)) return res.status(400).send("Invalid ID");
  console.log(exercise_ids);
  const exercises = await models.ExerciseSet.findAll({
    where: { id: exercise_ids },
  });
  if (!exercises || exercises.length === 0)
    return res.status(404).send("No Exercises Found");
  models.Workout.create({ name, sets, coach_id: coachId })
    .then((workout) => {
      if (!workout) return res.status(400).send("Couldn't Create Workout");
      workout
        .addExerciseSets(exercises)
        .then(() => {
          return res.status(201).send("Workout Created");
        })
        .catch((err) => {
          return res
            .status(400)
            .send(err.message, "Couldn't Append Exercises Sets");
        });
    })
    .catch((err) => res.status(400).send(err.message));
});

coach.get("/workout/show/:coachId", (req, res) => {});

coach.put("/workout/append/:coachId", (req, res) => {});

module.exports = coach;
