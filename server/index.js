require("dotenv").config();
const app = require("./app");
const env = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 3001;

app.use((req, res, next) => {
  req.io = io;
  next();
});

const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

app.set("socketIo", io);

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT} on ${env} work environment`);
});
