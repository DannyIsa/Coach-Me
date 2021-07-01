const models = require("../models");
const { Op, Model } = require("sequelize");
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

function unifyArray(array, attribute) {
  let temp = [];
  array.map((item) => {
    let str = item[attribute];
    if (str.includes(",")) {
      str = str.split(",");
      str.map((value) => {
        if (!temp.includes(value)) temp.push(value);
      });
    } else if (!temp.includes(str)) temp.push(str);
  });
  temp.sort();
  return temp;
}

coach.get("/requests/show/:coachId", async (req, res) => {
  const { coachId } = req.params;
  if (!Number(coachId)) return res.status(400).send("Invalid ID");
  const coach = await models.Coach.findOne({ where: { id: coachId } });
  if (!coach) return res.status(404).send("No Matching Coach");
  const requests = await coach.getCoachRequests();
  if (!requests || requests.length === 0) return res.status(200).send([]);
  res.status(200).send(requests);
});

coach.put("/request/accept/:coachId", async (req, res) => {
  const { coachId } = req.params;
  const { traineeId } = req.query;
  if (!Number(coachId) || !Number(traineeId))
    res.status(400).send("Invalid ID");
  const request = await models.CoachRequest.findOne({
    where: { trainee_id: traineeId, coach_id: coachId },
  });
  if (!request) return res.status(404).send("request not available");
  models.Trainee.update({ coach_id: coachId }, { where: { id: traineeId } })
    .then((data) => {
      if (!data[0]) return res.status(404).send("No Client With That Id");
      models.CoachRequest.destroy({
        where: { trainee_id: traineeId, coach_id: coachId },
      })
        .then(() => {
          req.io.emit("request handled", {
            traineeId: Number(traineeId),
            accept: true,
          });
          res.status(200).send("Request Accepted");
        })
        .catch((err) => res.status(400).send(err));
    })
    .catch((err) => res.status(400).send(err));
});

coach.put("/request/decline/:coachId", (req, res) => {
  const { coachId } = req.params;
  const { traineeId } = req.query;
  if (!Number(coachId) || !Number(traineeId))
    return res.status(400).send("Invalid ID");
  models.CoachRequest.destroy({
    where: { trainee_id: traineeId, coach_id: coachId },
  })
    .then((data) => {
      if (!data) {
        return res.status(404).send("No Client With That Id");
      }
      req.io.emit("request handled", {
        traineeId: Number(traineeId),
        accept: false,
      });
      res.status(200).send("Request Declined");
    })
    .catch((err) => res.status(400).send(err));
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
    .catch((err) => res.status(400).send(err));
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
    .catch((err) => res.status(400).send(err));
});

coach.post("/workouts/new/:coach_id", async (req, res) => {
  const { coach_id } = req.params;
  let { name, sets, exercises } = req.body;
  if (!name || name === "") return res.status(400).send("Invalid name");

  exercises.forEach((item) => {
    if (
      item.sets <= 0 ||
      item.min_reps <= 0 ||
      item.max_reps <= 0 ||
      item.max_reps <= 0 ||
      sets <= 0 ||
      !sets
    )
      return res.status(400).send("Numbers must be positive");
    if (item.max_reps < item.min_reps)
      return res.status(400).send("Max reps cant be lower then min reps");
  });
  if (!name.match(/^[A-Za-z1-9 ]*$/i))
    return res.status(400).send("Invalid name");
  if (!Number(coach_id)) return res.status(400).send("Invalid ID");
  let exerciseSets = await models.ExerciseSet.bulkCreate([...exercises]);
  if (!exerciseSets) exerciseSets = [];
  const workout = await models.Workout.create({ name, sets, coach_id });
  if (!workout) return res.status(400).send("Can't create workout");
  await exerciseSets.map(async (item, index) => {
    const query = await workout.addExerciseSets(item, {
      through: { index: index + 1 },
    });
    if (!query) return res.status(400);
  });
  return res.status(201).send("Workout Crated");
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
  const { exercise } = req.body;
  if (!exercise.name.match(/^[A-Za-z ]*$/i))
    return res.status(400).send("Invalid Name");
  const exists = await models.Exercise.findOne({
    where: { name: exercise.name },
  });
  if (exists) return res.status(400).send("Exercise already exists");
  models.Exercise.create({ ...exercise })
    .then(() => res.status(201).send(`Exercise ${exercise.name} added`))
    .catch((err) => res.status(400).send(err));
});
coach.get("/workouts/show/:coachId", async (req, res) => {
  const { coachId } = req.params;
  if (!coachId) return res.status(400).send("Invalid Id");
  const coach = await models.Coach.findOne({
    where: { id: coachId },
  });
  if (!coach) return res.status(404).send("Coach Not Found");
  const workouts = await coach.getWorkouts();
  if (!workouts) return res.status(200).send([]);
  const final = await Promise.all(
    workouts.map(async (workout) => {
      let sets = await workout.getExerciseSets();
      sets = sets.map((set) => {
        let temp = { ...set.toJSON(), index: set.WorkoutExerciseJoin.index };
        delete temp.WorkoutExerciseJoin;
        return temp;
      });
      sets.sort((a, b) => a.index - b.index);
      let item = { ...workout.toJSON(), exercises: sets };
      return item;
    })
  );
  res.status(200).send(final);
});

coach.get("/workouts/show-exercises/:coachId", async (req, res) => {
  const { coachId } = req.params;
  const { workoutId } = req.query;
  if (!coachId) return res.status(400).send("Invalid Coach Id");
  if (!workoutId) return res.status(400).send("Invalid Workout Id");
  const workout = await models.Workout.findOne({
    where: { coach_id: coachId, id: workoutId },
    include: models.ExerciseSet,
  });
  if (!workout) return res.status(404).send("Workout Not Found");
  const exercises = workout.ExerciseSets.map((item) => {
    let temp = {
      ...item.toJSON(),
      index: item.toJSON().WorkoutExerciseJoin.index,
    };
    delete temp.WorkoutExerciseJoin;
    return temp;
  });
  exercises.sort((a, b) => a.index - b.index);
  return res.status(200).send(exercises);
});
coach.get("/exercises/show", async (req, res) => {
  let { input, sort } = req.query;
  let query = { order: [["name", "ASC"]] };
  if (input.match(/^[ ]$/i)) input = "";
  if (input && input.match(/^[A-Za-z ]*$/i)) {
    if (sort === "name" || sort === "muscle" || sort === "type")
      query.where = { [sort]: { [Op.like]: "%" + input + "%" } };
  }
  const exercises = await models.Exercise.findAll(query);
  if (!exercises) return res.status(200).send([]);
  return res.status(200).send(exercises);
});

coach.get("/exercises/tags", async (req, res) => {
  const muscles = await models.Exercise.findAll({
    attributes: [[Sequelize.fn("DISTINCT", Sequelize.col("muscle")), "muscle"]],
  });
  const equipments = await models.Exercise.findAll({
    attributes: [
      [Sequelize.fn("DISTINCT", Sequelize.col("equipment")), "equipment"],
    ],
  });
  const types = await models.Exercise.findAll({
    attributes: [[Sequelize.fn("DISTINCT", Sequelize.col("type")), "type"]],
  });

  if (!muscles || !equipments || !types)
    return res.status(400).send("Couldn't get tags");

  const uniqueMuscles = unifyArray(muscles, "muscle");
  const uniqueTypes = unifyArray(types, "type");
  const uniqueEquipments = unifyArray(equipments, "equipment");

  return res.status(200).send({
    muscles: uniqueMuscles,
    types: uniqueTypes,
    equipments: uniqueEquipments,
  });
});

coach.put("/workouts/append/:coachId", (req, res) => {});

module.exports = coach;
