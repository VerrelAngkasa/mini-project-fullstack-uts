const express = require("express");
const { userRegister, userLogin, userLogout } = require("../controllers/authController");

const router = express.Router();

// Konfigurasi routes untuk users
router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/logout", userLogout);

module.exports = router;