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
const food = Router();
food.use(express.json());

food.get("/get-food/:searchedFood", async (req, res) => {
  const { searchedFood } = req.params;
  if (!searchedFood) return res.status(400).send("Must send food name");
  const searchedFoods = await models.Food.findAll({
    where: { name: { [Op.substring]: searchedFood } },
    limit: 15,
  });
  if (!searchedFoods) return res.status(404).send("No such food");
  res.status(200).send(searchedFoods);
});

food.post("/eaten-food", async (req, res) => {
  const { food, id, mealOfTheDay } = req.body;
  if (!food) return res.status(400).send("Must Send food");
  if (!id) return res.status(400).send("Must Send id");
  if (!mealOfTheDay) return res.status(400).send("Must Send Meal");

  await models.EatenFood.create({
    trainee_id: id,
    food_id: food.id,
    food_name: food.name,
    food_calories: food.calories,
    food_protein: food.protein,
    food_carbs: food.carbs,
    food_fats: food.fats,
    meal_of_the_day: mealOfTheDay,
  });
  const eatenFood = await models.EatenFood.findAll({
    where: {
      trainee_id: id,
    },
  });
  if (!eatenFood) return res.status(404).send("No eaten food for this trainee");
  res.status(200).send(eatenFood);
});

food.get("/eaten-food/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).send("Must send id");
  const eatenFood = await models.EatenFood.findAll({
    where: {
      trainee_id: id,
    },
  });
  if (!eatenFood) return res.status(404).send("No eaten food for this trainee");
  res.status(200).send(eatenFood);
});

module.exports = food;
