const { Socket } = require("dgram");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// handles socket.io connections
io.on("connection", (Socket) => {
  console.log("User connected");

  // when a user sends a message, broadcast it to all other users
  Socket.on("message", (message) => {
    console.log("Message: " + message);
    Socket.broadcast.emit("message", message);
  });

  // if a user disconnects, log it to the console
  Socket.on("disconnect", (reason) => {
    console.log(`User disconnected (${reason})`);
  });
});

server.listen(3000, () => {
  console.log("Server started - http://localhost:3000");
});
