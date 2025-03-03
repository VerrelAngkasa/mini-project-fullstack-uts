const express = require('express');
const authController = require('../controllers/authController');

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
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

module.exports = router;
