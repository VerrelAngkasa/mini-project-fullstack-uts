const jwt = require("jsonwebtoken");
require("dotenv").config();

// Fungsi untuk generate token JWT user
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Fungsi untuk verifikasi token JWT user
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateToken, verifyToken };