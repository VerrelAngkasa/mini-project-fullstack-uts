const express = require('express');
const { addTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');
const validateTask = require('../middleware/taskMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

// Konfigurasi routes untuk tasks
router.get('/', getTasks);
router.post('/', validateTask, addTask);
router.put('/:_id', validateTask, updateTask);
router.delete('/:_id', deleteTask);

module.exports = router;