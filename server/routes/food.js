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

food.get("/", async (req, res) => {
  const allFood = await models.Food.findAll({});
  if (!allFood) {
    return res.status(500).send({ message: "internal server error" });
  }
  res.status(200).send(allFood);
});

food.get("/:searchedFood", async (req, res) => {
  const { searchedFood } = req.params;
  if (!searchedFood) return res.status(400).send("Must send food name");
  const searchedFoods = await models.Food.findAll({
    where: { name: { [Op.substring]: searchedFood } },
    limit: 15,
  });
  if (!searchedFoods) return res.status(404).send("No such food");
  res.status(200).send(searchedFoods);
});

food.post("/add", async (req, res) => {
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
  res.status(200).send("item added successfully");
});

module.exports = food;
