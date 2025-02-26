const express = require("express");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const socketio = require('socket.io');
const connectDB = require('./config/db');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Memungkinkan app untuk melakukan pertukaran data kepada semua sumber (cross-origin)
// Untuk meng-parsing data menjadi format json
app.use(cors());
app.use(express.json());

// Koneksi ke database MongoDB
connectDB();

// Untuk menggunakan routes users dan tasks yang berada di directory yang berbeda
app.use("/auth", require('./routes/authRoutes'));
app.use("/tasks", require('./routes/taskRoutes'));

// Untuk menjalankan server
const server = app.listen(port, () => console.log(`Server running on http://localhost:${port}`));

// Setup Websocket
const io = socketio(server);
io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("disconnect", () => console.log("Client disconnected"));
});