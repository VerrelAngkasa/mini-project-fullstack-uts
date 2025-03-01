const express = require("express");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const socketio = require('socket.io');
const connectDB = require('./config/db');
const http = require('http');
const path = require('path');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const port = process.env.PORT || 3000;

// Memungkinkan app untuk melakukan pertukaran data kepada semua sumber (cross-origin)
// Untuk meng-parsing data menjadi format json
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Koneksi ke database MongoDB
connectDB();

// Untuk menggunakan routes users dan tasks yang berada di directory yang berbeda
app.use("/auth", require('./routes/authRoutes'));
app.use("/tasks", require('./routes/taskRoutes'));

app.get('/', (req, res) => {
  res.render('index', { user: null }); // Pastikan variabel dikirim ke EJS
});

// Untuk menjalankan server
server.listen(port, () => console.log(`Server running on http://localhost:${port}`));

// Setup Websocket
io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("disconnect", () => console.log("User disconnected"));

  // Emit a new task notification for testing
  setTimeout(() => {
    socket.emit('newTask', { message: 'You have a new task!' });
  }, 5000);
});