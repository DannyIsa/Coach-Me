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
    order: [["created_at", "DESC"]],
    limit: 50,
  });
  if (!messages) return res.status(200).send([]);
  res.status(200).send(messages);
});

chat.post("/:traineeId/:coachId", async (req, res) => {
  const { traineeId, coachId } = req.params;
  const { content, sender } = req.body;
  const io = req.app.get("socketIo");
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
  io.emit("message received", {
    traineeId,
    coachId,
    sender,
    content,
    createdAt: message.createdAt,
  });
  return res.status(201).send(message);
});

chat.get("/show/list/:coachId", async (req, res) => {
  const { coachId } = req.params;
  if (!coachId) return res.status(400).send("Id Required");
  const coach = await models.Coach.findOne({ where: { id: coachId } });
  if (!coach) return res.status(404).send("Coach Not Found");
  const chats = await coach.getChats({
    attributes: ["trainee_id"],
    group: ["trainee_id"],
  });
  const clients = await coach.getTrainees({
    attributes: [
      ["name", "trainee_name"],
      ["id", "trainee_id"],
    ],
  });

  if (!chats && !clients) return res.status(200).send([]);
  let combined = [];

  if (chats.length === 0 && clients.length > 0) combined = clients;
  else if (chats.length > 0) {
    const chatList = await Promise.all(
      chats.map(async (chat) => {
        let trainee = await models.Trainee.findOne({
          where: { id: chat.toJSON().trainee_id },
        });
        let lastMessage = await coach.getChats({
          attributes: ["created_at"],
          where: { trainee_id: chat.trainee_id },
          order: [["created_at", "DESC"]],
          limit: 1,
        });
        if (!trainee) return;
        return {
          trainee_name: trainee.toJSON().name,
          trainee_id: chat.trainee_id,
          created_at: lastMessage[0].toJSON().created_at,
        };
      })
    );
    if (clients.length === 0) combined = chatList;
    else
      combined = chatList.concat(
        clients.filter(
          (client) =>
            !chatList.find(
              (chat) => chat.trainee_id === client.toJSON().trainee_id
            )
        )
      );
  }
  combined.sort((a, b) => b.created_at - a.created_at);
  return res.status(200).send(combined);
});

module.exports = chat;
