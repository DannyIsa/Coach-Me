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

async function getEatenFoodFromToday(trainee_id) {
  const eatenFood = await models.EatenFood.findAll({
    where: {
      [Op.and]: [
        { trainee_id },
        {
          created_at: {
            [Op.gt]: new Date().setHours(0, 0, 0, 0),
            [Op.lt]: new Date(),
          },
        },
      ],
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
const getFoodFromNeedToEat = async (trainee_id) => {
  const eatenFood = await models.NeedToEat.findAll({
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
};

food.get("/get-food", async (req, res) => {
  const { searchedFood } = req.query;
  const searchedFoods = await models.Food.findAll({
    where: { name: { [Op.substring]: searchedFood ? searchedFood : "" } },
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
    calorie_goal: trainee.toJSON().daily_calorie_goal,
  });
  const query = await trainee.addEatenFood(eaten);
  if (!query) return res.status(400).send("Couldn't add food");
  const food = await eaten.getFood();
  if (!food) return res.status(400).send("Couldn't get data");
  const dataToSend = { ...food.toJSON(), ...eaten.toJSON() };
  res.status(201).send(dataToSend);
});

food.delete("/eaten-food/:foodId", async (req, res) => {
  const { foodId } = req.params;
  const { traineeId } = req.query;

  if (!foodId) return res.status(400).send("Must send food id");
  if (!traineeId) return res.status(400).send("Must send trainee id");

  const eatenFoodId = await models.EatenFood.findOne({
    where: { id: foodId, trainee_id: traineeId },
  });
  if (!eatenFoodId) return res.status(404).send("No food with that id");
  await eatenFoodId.destroy();
  const { status, data } = await getEatenFoodFromToday(traineeId);
  res.status(status).send(data);
});

food.get("/need-to-eat/:coachId", async (req, res) => {
  const { coachId } = req.params;
  const { traineeId } = req.query;
  if (!coachId || !traineeId) return res.status(400).send("Must send id");
  const trainee = await models.Trainee.findOne({
    where: { coach_id: coachId, id: traineeId },
  });
  if (!trainee) return res.status(404).send("No Matching Client");
  const { status, data } = await getFoodFromNeedToEat(traineeId);
  res.status(status).send(data);
});

food.delete("/need-to-eat/:foodId", async (req, res) => {
  const { foodId } = req.params;
  const { traineeId } = req.query;
  if (!foodId) return res.status(400).send("Must send food id");
  if (!traineeId) return res.status(400).send("Must send trainee id");
  const needToEatFood = await models.NeedToEat.findOne({
    where: { id: foodId, trainee_id: traineeId },
  });
  if (!needToEatFood) return res.status(404).send("No food with that id");
  await needToEatFood.destroy();
  const { status, data } = await getFoodFromNeedToEat(traineeId);
  res.status(status).send(data);
});

module.exports = food;
