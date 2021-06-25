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
});

module.exports = food;
