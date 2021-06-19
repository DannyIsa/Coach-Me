const models = require("./models");
const { Op } = require("sequelize");
const Sequelize = require("sequelize");
const Meal = require("./models/Meal");
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

// // Exercise => ExerciseSet

// models.ExerciseSet.findAll().then(async (res) => {
//   console.log(res[0].toJSON());
//   const exercises = await res[0].getExercises();
//   console.log(exercises[0].toJSON());
// });

// // Workout => Coach <= Trainee;

// models.Coach.findOne().then(async (res) => {
//   console.log(res.toJSON());
//   const workouts = await res.getWorkouts();
//   console.log(workouts[0].toJSON());
//   const trainees = await res.getTrainees();
//   console.log(trainees[0].toJSON());
// });

// //Logs => Trainee

// models.Trainee.findOne().then(async (res) => {
//   console.log(res.toJSON());
//   const wLog = await res.getWorkoutLogs();
//   console.log(wLog[0].toJSON());
//   const mLogs = await res.getMeasureLogs();
//   console.log(mLogs[0].toJSON());
//   const dLogs = await res.getDietLogs();
//   console.log(dLogs[0].toJSON());
// });

// //WorkoutLog => Workout

// models.Workout.findOne().then(async (res) => {
//   console.log(res.toJSON());
//   // const logs = await res.getWorkoutLogs();
//   // console.log(logs[0].toJSON());
// });

// //CoachRequest => Trainee

// models.Trainee.findOne().then(async (res) => {
//   console.log(res.toJSON());
//   const request = await res.getCoachRequest();
//   console.log(request.toJSON());
// });

// // CoachRequest => Coach

// models.Coach.findOne().then(async (res) => {
//   console.log(res.toJSON());
//   const requests = await res.getCoachRequests();
//   console.log(requests[0].toJSON());
// });

//Trainee + Meal

// models.Trainee.findOne().then(async (res) => {
//   console.log(res.toJSON());
//   const meal = await res.getMeals();
//   console.log(meal[0].toJSON());
// });
// models.Meal.findOne().then(async (res) => {
//   console.log(res.toJSON());
//   const trainee = await res.getTrainees();
//   console.log(trainee[0].toJSON());
// });

// //Food + Meal

// models.Food.findOne().then(async (res) => {
//   console.log(res.toJSON());
//   const meals = await res.getMeals();
//   meals.map((item) => console.log(item.toJSON()));
// });
// models.Meal.findOne({ where: { id: 6 } }).then(async (res) => {
//   console.log(res.toJSON());
//   const food = await res.getFood();
//   food.map((item) => console.log(item.toJSON()));
// });

// //Workout + ExerciseSet
// models.Workout.findOne().then(async (res) => {
//   console.log(res.toJSON());
//   const set = await res.getExerciseSets();
//   set.map((item) => console.log(item.toJSON()));
// });
// models.ExerciseSet.findOne({ where: { id: 2 } }).then(async (res) => {
//   console.log(res.toJSON());
//   const Workout = await res.getWorkouts();
//   Workout.map((item) => console.log(item.toJSON()));
// });
