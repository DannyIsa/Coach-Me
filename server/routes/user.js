require("dotenv").config();
const express = require("express");
const { Router } = require("express");
const user = Router();
user.use(express.json());

user.get("/", (req, res) => {
  res.send("hello");
});

module.exports = user;
