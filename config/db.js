const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Connect ke database MongoDB yang bernama mini_project
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = connectDB;
