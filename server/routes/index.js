const { Router } = require("express");
const user = require("./user");
const coach = require("./coach");
const trainee = require("./trainee");

const api = Router();

api.use("/user", user);
api.use("/coach", coach);
api.use("/trainee", trainee);

module.exports = api;
