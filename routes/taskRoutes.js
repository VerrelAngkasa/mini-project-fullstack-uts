const express = require('express');
const { addTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');
const validateTask = require('../middleware/taskMiddleware');

const router = express.Router();

router.use(authMiddleware);

// Konfigurasi routes untuk tasks
router.get('/', getTasks);
router.post('/', validateTask, addTask);
router.put('/:id', validateTask, updateTask);
router.delete('/:id', validateTask, deleteTask);

module.exports = router;