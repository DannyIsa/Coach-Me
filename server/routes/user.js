require("dotenv").config();
const express = require("express");
const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { hashSync, compare } = require("bcrypt");

const user = Router();

user.use(express.json());

user.get("/login", (req, res) => {
  res.send("hi!!");
});

user.post("/login", (req, res) => {
  const { email, password } = req.body;
});

user.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = hashSync(password, 10);

  const isPasswordCorrect = await compare(password, hashedPassword);
  res.send(isPasswordCorrect);
});

module.exports = user;
