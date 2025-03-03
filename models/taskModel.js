const mongoose = require('mongoose');

// Task Collection in MongoDB
const taskCollection = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  deadline: { type: Date, required: true },
  status: { type: String, enum: ["pending", "progress", "done"], default: "pending" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel', required: true },
});

module.exports = mongoose.model('taskModel', taskCollection);