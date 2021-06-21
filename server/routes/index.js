const { Router } = require("express");
const user = require("./user");
const coach = require("./coach");
const trainee = require("./trainee");
const meal = require("./meal");
const logs = require("./logs");

const api = Router();

api.use("/user", user);
api.use("/coach", coach);
api.use("/trainee", trainee);
api.use("/meal", meal);
api.use("/logs", logs);

module.exports = api;
