const User = require("../models/userModel");
const { generateToken } = require("../config/auth");
const bcrypt = require("bcryptjs");

const authController = {
  // Register User
  register: async (req, res) => {
    const { username, password } = req.body;
    try {
      const userId = await User.create(username, password);
      const token = generateToken(userId);
      res.status(201).json({ message: 'Register successfully!', token });
    } catch (err) {
      res.status(500).json({ message: "Registration failed" });
    }
  },

  // Login User
  login: async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findByUsername(username);
      if (!user) return res.status(404).json({ message: "User not found" });

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

      const token = generateToken(user.id);
      res.json({ message: 'Login successfully!', token });
    } catch (err) {
      res.status(500).json({ message: "Login failed" });
    }
  },

  // Logut User
  logout: async (req, res) => {
    try {
      res.json({ message: "Logged out successfully" });
    } catch (err) {
      res.status(500).json({ message: "Logout failed" });
    }
  }
};

module.exports = authController;