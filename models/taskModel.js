const mongoose = require('mongoose');

const taskCollection = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  deadline: { type: Date, required: true },
  status: { type: String, default: 'Belum Selesai' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel' },
});

module.exports = mongoose.model('taskModel', taskCollection);