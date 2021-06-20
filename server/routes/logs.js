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
const logs = Router();
logs.use(express.json());

logs.post("/workout/add", (req, res) => {});

logs.post("/measure/add", async (req, res) => {
  const {
    id: traineeId,
    weight,
    chestPerimeter,
    hipPerimeter,
    bicepPerimeter,
    thighPerimeter,
    waistPerimeter,
  } = req.body || null;
  const trainee = await models.Trainee.findOne({ where: { id: traineeId } });
  if (!traineeId || !trainee) {
    return res.status(400).send("Invalid ID");
  }
  if (
    !weight &&
    !chestPerimeter &&
    !hipPerimeter &&
    !bicepPerimeter &&
    !thighPerimeter &&
    !waistPerimeter
  ) {
    return res.status(400).send("Must send measure logs");
  }

  models.MeasureLog.create({
    id: traineeId,
    weight,
    "chest-perimeter": chestPerimeter,
    "hip-perimeter": hipPerimeter,
    "bicep-perimeter": bicepPerimeter,
    "thigh-perimeter": thighPerimeter,
    "waist-perimeter": waistPerimeter,
  }).then(() => {
    res.status(201).send(`${traineeId} measure logs added`);
  });
});

logs.post("/diet/add", (req, res) => {});

logs.get("/workout/show:traineeId", (req, res) => {});

logs.get("/measure/show:traineeId", (req, res) => {});

logs.get("/diet/show:traineeId", (req, res) => {});

module.exports = logs;
