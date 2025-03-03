const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Collection in MongoDB
const userCollection = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userCollection.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

module.exports = mongoose.model('userModel', userCollection);