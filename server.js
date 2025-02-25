const express = require("express");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Untuk meng-parsing data menjadi format json
app.use(express.json());

// Untuk menggunakan routes users dan tasks yang berada di directory yang berbeda
app.use("/auth", authRoutes);
app.use("/", taskRoutes);

// Untuk menjalankan server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});