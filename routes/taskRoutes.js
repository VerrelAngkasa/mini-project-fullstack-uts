const express = require('express');
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');
const validateTask = require('../middleware/taskMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Use to Authenticate User
router.use(authMiddleware);

// Route to Show All Tasks
router.get('/', getTasks);

// Route to Create a New Task 
router.post('/', validateTask, createTask);

// Route to Edit Task Form
router.post('/edit/:id', validateTask, updateTask);

// Route to Update Task
router.put('/update/:id', validateTask, updateTask);

// Route to Delete Task
router.delete('/delete/:id', deleteTask);

module.exports = router;