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
  const { foodId, traineeId, mealOfTheDay, amount } = req.body;
  if (!foodId) return res.status(400).send("Must Send food Id");
  if (!traineeId) return res.status(400).send("Must Send trainee Id");
  if (!mealOfTheDay) return res.status(400).send("Must Send Meal");
  if (!amount) return res.status(400).send("Must Send amount");

  const trainee = await models.Trainee.findOne({ where: { id: traineeId } });
  const food = await models.Food.findOne({ where: { id: foodId } });
  if (!trainee || !food) return res.status(404).send("Item not found");
  const query = await trainee.addFood(food, {
    through: { amount, meal_of_the_day: mealOfTheDay },
  });
  if (!query) return res.status(400).send("Could Not Add Item");
  return res.status(201).send(query);
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

food.delete("/eaten-food/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).send("Must send id");
  const eatenFoodId = await models.EatenFood.findOne({
    where: { id },
  });
  if (!eatenFoodId) return res.send(404).send("No food with that id");
  const deletedFoodTraineeId = eatenFoodId.trainee_id;
  await eatenFoodId.destroy();
  const eatenFood = await models.EatenFood.findAll({
    where: {
      trainee_id: deletedFoodTraineeId,
    },
  });
  if (!eatenFood) return res.send(404).send("No eaten food for this trainee");
  res.status(200).send(eatenFood);
});

food.get("/need-to-eat/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (!id) return res.status(400).send("Must send id");
  const traineesNeedToEatFood = await models.NeedToEat.findAll({
    where: { trainee_id: id },
  });
  if (!traineesNeedToEatFood) {
    return res.status(404).send("No need to eat food fo this trainee");
  }
  res.status(200).send(traineesNeedToEatFood);
});

module.exports = food;
