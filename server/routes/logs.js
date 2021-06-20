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

logs.post("/measure/add", (req, res) => {});

logs.post("/diet/add", (req, res) => {});

logs.get("/workout/show:traineeId", (req, res) => {});

logs.get("/measure/show:traineeId", (req, res) => {});

logs.get("/diet/show:traineeId", (req, res) => {});

module.exports = logs;
