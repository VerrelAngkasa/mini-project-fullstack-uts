const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/student_task_manager", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connectDB = mongoose.connection;
connectDB.on("error", console.error.bind(console, "Database connection failed!"));
connectDB.once("open", () => console.log("Connected to MongoDB successfully!"));

module.exports = connectDB;
