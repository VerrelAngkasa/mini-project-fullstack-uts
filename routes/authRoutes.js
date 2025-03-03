const express = require("express");
const { register, login, logout } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Route untuk menampilkan halaman login & register
router.get("/login", (req, res) => res.render("login"));
router.get("/register", (req, res) => res.render("register"));

// Route untuk register, login (TIDAK PERLU authMiddleware)
router.post("/register", register);
router.post("/login", login);

// Route logout (BUTUH authMiddleware untuk memastikan user login)
router.post("/logout", authMiddleware, logout);

module.exports = router;
