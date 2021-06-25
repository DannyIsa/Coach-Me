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

coach.get("/requests/show/:coachId", async (req, res) => {
  const { coachId } = req.params;
  if (!Number(coachId)) return res.status(400).send({ message: "Invalid ID" });
  const coach = await models.Coach.findOne({ where: { id: coachId } });
  if (!coach) return res.status(404).send({ message: "No Matching Coach" });
  const requests = await coach.getCoachRequests();
  if (!requests || requests.length === 0) return res.status(200).send([]);
  res.status(200).send(requests);
});

coach.put("/request/accept/:coachId", async (req, res) => {
  const { coachId } = req.params;
  const { traineeId } = req.query;
  if (!Number(coachId) || !Number(traineeId))
    res.status(400).send({ message: "Invalid ID" });
  const request = await models.CoachRequest.findOne({
    where: { trainee_id: traineeId, coach_id: coachId },
  });
  if (!request)
    return res.status(404).send({ message: "request not available" });
  models.Trainee.update({ coach_id: coachId }, { where: { id: traineeId } })
    .then((data) => {
      if (!data[0])
        return res.status(404).send({ message: "No Client With That Id" });
      models.CoachRequest.destroy({
        where: { trainee_id: traineeId, coach_id: coachId },
      })
        .then(() => {
          res.status(200).send("Request Accepted");
        })
        .catch((err) => res.status(400).send(err.message));
    })
    .catch((err) => res.status(400).send(err.message));
});

coach.put("/request/decline/:coachId", (req, res) => {
  const { coachId } = req.params;
  const { traineeId } = req.query;
  if (!Number(coachId) || !Number(traineeId))
    return res.status(400).send({ message: "Invalid ID" });
  models.CoachRequest.destroy({
    where: { trainee_id: traineeId, coach_id: coachId },
  })
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: "No Client With That Id" });
      }
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
    .then((data) => res.status(201).send({ id: data.id }))
    .catch((err) => res.status(400).send(err.message));
});

coach.post("/exercise-set/append", async (req, res) => {
  const { exercise_id, workout_id } = req.body;
  if (!Number(exercise_id) || !Number(workout_id))
    return res.status(400).send({ message: "Invalid ID" });
  const exercise = await models.ExerciseSet.findOne({
    where: { id: exercise_id },
  });
  if (!exercise) return res.status(404).send({ message: "No Exercise Found" });
  const workout = await models.Workout.findOne({ where: { id: workout_id } });
  if (!workout) return res.status(404).send({ message: "No Workout Found" });

  exercise
    .addWorkout(workout)
    .then(() => res.status(201).send("Exercise Added To Workout"))
    .catch((err) => res.status(400).send(err.message));
});

coach.post("/workouts/new/:coachId", async (req, res) => {
  const { coachId } = req.params;
  const { name, sets, exercise_ids } = req.body;
  if (!Number(coachId)) return res.status(400).send({ message: "Invalid ID" });

  const exercises = await models.ExerciseSet.findAll({
    where: { id: exercise_ids },
  });
  if (!exercises || exercises.length === 0)
    return res.status(404).send("No Exercises Found");
  models.Workout.create({ name, sets, coach_id: coachId })
    .then((workout) => {
      if (!workout)
        return res.status(400).send({ message: "Couldn't Create Workout" });
      workout
        .addExerciseSets(exercises)
        .then(() => {
          return res.status(201).send("Workout Created");
        })
        .catch((err) => {
          return res
            .status(400)
            .send({ message: "Couldn't Append Exercises Sets" });
        });
    })
    .catch((err) => res.status(400).send(err.message));
});

coach.get("/clients/show/:userId", async (req, res) => {
  const { userId } = req.params;
  if (!Number(userId)) return res.status(400).send("Invalid ID");
  const coach = await models.Coach.findOne({ where: { id: userId } });
  if (!coach) return res.status(404).send("No Matching Coach");
  const trainees = await coach.getTrainees();
  if (!trainees || trainees.length === 0) return res.status(200).send([]);
  res.status(200).send(trainees);
});

coach.get("/show/all", async (req, res) => {
  const coaches = await models.Coach.findAll();
  if (!coaches || coaches.length === 0) return res.status(200).send([]);
  res.status(200).send(coaches);
});

coach.post("/exercise/add", async (req, res) => {
  const { name, muscle, image, type, description, equipment } = req.body;
  const exists = await models.Exercise.findOne({ where: { name } });
  if (exists)
    return res.status(400).send({ message: "Exercise already exists" });
  models.Exercise.create({
    name,
    muscle,
    image,
    type,
    description,
    equipment,
  })
    .then(() => res.status(201).send("Exercise created"))
    .catch((err) => res.status(400).send(err.message));
});
coach.get("/workouts/show/:coachId", async (req, res) => {
  const { coachId } = req.params;
  const coach = await models.Coach.findOne({ where: { id: coachId } });
  if (!coach) return res.status(404).send({ message: "Coach Not Found" });
  const workouts = await coach.getWorkouts();
  if (!workouts) return res.status(200).send([]);
  res.status(200).send(workouts);
});

coach.get("/exercises/show", async (req, res) => {
  let { input, sort } = req.query;
  let query = { order: [["name", "ASC"]] };
  if (input.match(/^[ ]/i)) input = "";
  if (input && input.match(/^[A-Za-z ]/i)) {
    if (sort === "name" || sort === "muscle" || sort === "type")
      query.where = { [sort]: { [Op.like]: "%" + input + "%" } };
  }
  const exercises = await models.Exercise.findAll(query);
  if (!exercises) return res.status(200).send([]);
  return res.status(200).send(exercises);
});

coach.put("/workouts/append/:coachId", (req, res) => {});

module.exports = coach;
