require("dotenv").config();
const express = require("express");
const cors = require("cors");
const api = require("./routes");

const app = express();
const io = require("socket.io")(8080);
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(express.json());
app.use(cors());

app.use("/api", api);

module.exports = app;
