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

// models.exercise_set.findAll().then(async (res) => {
//   console.log(res[0].toJSON());
//   const exercises = await res[0].getExercises();
//   console.log(exercises[0].toJSON());
// });

models.workout_exercise_join.findOne().then(async (res) => {
  console.log(res.exercise_sets[0].toJSON());
  const exercise = await res.getExercise_sets();
  console.log(exercise);
});
