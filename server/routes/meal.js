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

meal.post("/new", async (req, res) => {
  //CHANGE
  const { name, description, ingredients } = req.body;
  let calories = 0;
  let protein = 0;
  let fats = 0;
  let carbs = 0;
  ingredients.forEach((item) => {
    calories += item.calories;
    protein += item.protein;
    fats += item.fats;
    carbs += item.carbs;
  });
  const meal = await models.Meal.create({
    name,
    description,
    calories,
    protein,
    fats,
    carbs,
  });
  const Food = await models.Food.findAll({
    where: { name: ingredients.map((item) => item.name) },
  });
  meal
    .addFood(Food)
    .then(() => {
      res.status(201).send("Meal Created");
    })
    .catch((err) => res.status(400).send(err.message));
});

module.exports = meal;
