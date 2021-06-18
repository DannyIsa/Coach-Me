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
const meal = Router();
meal.use(express.json());

meal.post("/new", (req, res) => {
  const { name, description, ingredients } = req.body;
  let calories = 0;
  let protein = 0;
  let fats = 0;
  let carbs = 0;
  bulkQuery = [];
  ingredients.map((item) => {
    calories += item.calories;
    protein += item.protein;
    fats += item.fats;
    carbs += item.carbs;
    bulkQuery.push({ food_name: item.name });
  });
  models.Meal.create({
    name,
    description,
    calories,
    protein,
    fats,
    carbs,
  })
    .then((data) => {
      const { id } = data.toJSON();
      bulkQuery.forEach((item) => (item.meal_id = id));
      models.FoodMealJoin.bulkCreate([...bulkQuery])
        .then(() => {
          res.status(201).send("Meal Created");
        })
        .catch((err) => res.status(400).send(err.message));
    })
    .catch((err) => res.status(400).send(err.message));
});

module.exports = meal;
