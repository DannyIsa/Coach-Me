const models = require("./models");
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

// Exercise => ExerciseSet <= WorkoutExerciseJoin

// models.ExerciseSet.findAll().then(async (res) => {
//   console.log(res[0].toJSON());
//   const exercises = await res[0].getExercises();
//   console.log(exercises[0].toJSON());
//   const joins = await res[0].getWorkoutExerciseJoins();
//   console.log(joins[0].toJSON());
// });

// Workout => Coach <= Trainee;

// models.Coach.findOne().then(async (res) => {
//   console.log(res.toJSON());
//   const workouts = await res.getWorkouts();
//   console.log(workouts[0].toJSON());
//   const trainees = await res.getTrainees();
//   console.log(trainees[0].toJSON());
// });

//Logs => Trainee

// models.Trainee.findOne().then(async (res) => {
//   console.log(res.toJSON());
//   const wLog = await res.getWorkoutLogs();
//   console.log(wLog[0].toJSON());
//   const mLogs = await res.getMeasureLogs();
//   console.log(mLogs[0].toJSON());
//   const dLogs = await res.getDietLogs();
//   console.log(dLogs[0].toJSON());
// });

//WorkoutLog => Workout <= WorkoutExerciseJoin

// models.Workout.findOne().then(async (res) => {
//   console.log(res.toJSON());
//   // const logs = await res.getWorkoutLogs();
//   // console.log(logs[0].toJSON());
//   const join = await res.getWorkoutExerciseJoins();
//   console.log(join[0].toJSON());
// });

// FoodMealJoin => Meal

// models.Meal.findAll().then(async (res) => {
//   console.log(res[0].toJSON());
//   const joins = await res[0].getFoodMealJoins();
//   console.log(joins[0].toJSON());
// });

//FoodMealJoin => Food

models.Food.findOne().then(async (res) => {
  console.log(res.toJSON());
  const joins = await res.getFoodMealJoins();
  console.log(joins[0].toJSON());
});
