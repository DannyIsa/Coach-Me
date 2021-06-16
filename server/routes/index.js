const { Router } = require("express");
const user = require("./user");

const api = Router();

api.use("/user", user);

module.exports = api;
