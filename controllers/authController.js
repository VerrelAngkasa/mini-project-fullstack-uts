const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Fungsi untuk registrasi user
async function userRegister(req, res) {
  const { username, password } = req.body;

  try {
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully!' })
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Fungsi untuk login user
async function userLogin(req, res) {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || await bcrypt.compare(password, user.password)) {
      return res.status(400).json({ message: 'Username or password not found' });
    }
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Fungsi untuk logout user
async function userLogout(req, res) {
  try {
    res.json({ message: 'Logged out successfully!' });
  } catch (err) {
    res.status(400).json({ message: err.messsage });
  }
}

module.exports = { userRegister, userLogin, userLogout };