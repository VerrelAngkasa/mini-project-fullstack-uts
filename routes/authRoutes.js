const express = require('express');
const { register, login, logout } = require('../controllers/authController');

const router = express.Router();

// Route for Register Page
router.get('/register', (req, res) => {
    res.render('register');
});

// Route for Login Page
router.get('/login', (req, res) => {
    res.render('login');
});

// HTTP Method for Register, Login, and Logout Page
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;
