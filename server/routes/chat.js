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
const chat = Router();
chat.use(express.json());

chat.get("/:traineeId/:coachId", async (req, res) => {
  const { traineeId, coachId } = req.params;
  if (!coachId || !traineeId)
    return res.status(400).send("Must send trainee and coach id");
  const trainee = await models.Trainee.findOne({
    where: { id: traineeId },
  });
  if (!trainee) return res.status(404).send("User Not Found");
  const coach = await models.Coach.findOne({ where: { id: coachId } });
  if (!coach) return res.status(404).send("User Not Found");
  const messages = await trainee.getChats({
    where: { coach_id: coachId },
    order: [["created_at"]],
    limit: 50,
  });
  if (!messages) return res.status(200).send([]);
  res.status(200).send(messages);
});

chat.post("/:traineeId/:coachId", async (req, res) => {
  const { traineeId, coachId } = req.params;
  const { content, sender } = req.body;
  if (!coachId || !traineeId)
    return res.status(400).send("Must send trainee and coach id");
  if (!content || content === "")
    return res.status(400).send("Invalid Content");
  if (sender !== "Trainee" && sender !== "Coach")
    return res.status(400).send("Sender Required");
  const trainee = await models.Trainee.findOne({
    where: { id: traineeId },
  });
  if (!trainee) return res.status(404).send("User Not Found");
  const coach = await models.Coach.findOne({ where: { id: coachId } });
  if (!coach) return res.status(404).send("User Not Found");

  const message = await models.Chat.create({
    trainee_id: traineeId,
    coach_id: coachId,
    content,
    sender,
  });
  if (!message) return res.status(400).send("Couldn't Send Message");
  req.io.emit("message received", { traineeId, coachId, sender, content });
  return res.status(201).send(message);
});

module.exports = chat;
