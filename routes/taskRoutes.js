const express = require('express');
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');
const validateTask = require('../middleware/taskMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

// Konfigurasi routes untuk tasks
router.get('/', getTasks);
router.post('/', validateTask, createTask);
router.put('/:id', validateTask, updateTask);  // Menggunakan :id bukan :_id
router.delete('/:id', deleteTask);  // Menggunakan :id bukan :_id

module.exports = router;
