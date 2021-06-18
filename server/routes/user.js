require("dotenv").config();
const express = require("express");
const { Router } = require("express");

const user = Router();

user.use(express.json());

module.exports = user;
