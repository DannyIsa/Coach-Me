const { Router } = require("express");
const user = require("./user");
const coach = require("./coach");
const trainee = require("./trainee");
const logs = require("./logs");
const food = require("./food");
const chat = require("./chat");

const api = Router();

api.use("/user", user);
api.use("/coach", coach);
api.use("/trainee", trainee);
api.use("/logs", logs);
api.use("/food", food);
api.use("/chat", chat);

module.exports = api;
