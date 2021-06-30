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

async function getFoodFromEaten(trainee_id) {
  const eatenFood = await models.EatenFood.findAll({
    where: {
      trainee_id,
    },
    include: {
      model: models.Food,
      attributes: [
        "name",
        "calories",
        "protein",
        "carbs",
        "fats",
        "weight",
        "image",
      ],
    },
  });

  if (!eatenFood) return { status: 404, data: "Couldn't find food" };
  const valArray = eatenFood.map((item) => {
    let temp = { ...item.toJSON(), ...item.Food.toJSON() };
    delete temp.Food;
    return temp;
  });
  return { status: 200, data: valArray };
}

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
  if (!foodId) return res.status(400).send("Must Send Food Id");
  if (!traineeId) return res.status(400).send("Must Send Trainee Id");
  if (!mealOfTheDay) return res.status(400).send("Must Send Meal");
  if (!amount) return res.status(400).send("Must Send Amount");

  const trainee = await models.Trainee.findOne({ where: { id: traineeId } });
  if (!trainee) return res.status(404).send("No Trainee Found");
  const eaten = await models.EatenFood.create({
    trainee_id: traineeId,
    food_id: foodId,
    meal_of_the_day: mealOfTheDay,
    amount,
  });
  const query = await trainee.addEatenFood(eaten);
  if (!query) return res.status(400).send("Couldn't add food");
  const food = await eaten.getFood();
  if (!food) return res.status(400).send("Couldn't get data");
  const dataToSend = { ...eaten.toJSON(), ...food.toJSON() };
  res.status(201).send(food);
});

food.get("/eaten-food/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).send("Must send id");
  const { status, data } = await getFoodFromEaten(id);
  res.status(status).send(data);
});

food.delete("/eaten-food/:foodId", async (req, res) => {
  const { foodId } = req.params;
  const { traineeId } = req.query;
  if (!foodId) return res.status(400).send("Must send food id");
  if (!traineeId) return res.status(400).send("Must send trainee id");

  const eatenFoodId = await models.EatenFood.findOne({
    where: { id: foodId, trainee_id: traineeId },
  });
  if (!eatenFoodId) return res.send(404).send("No food with that id");
  await eatenFoodId.destroy();
  const { status, data } = await getFoodFromEaten(traineeId);
  res.status(status).send(data);
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
