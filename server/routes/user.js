const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { hashSync, compare } = require("bcrypt");

const user = Router();

user.get("/login", (req, res) => {
  res.send("hi!!");
});

module.exports = user;
