require("dotenv").config();
const express = require("express");
const cors = require("cors");
const api = require("./routes");

const app = express();
const io = require("socket.io")(8080, {
  transport: ["websocket"],
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
  },
});
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use("/api", api);

module.exports = app;
