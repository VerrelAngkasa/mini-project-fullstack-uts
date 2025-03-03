const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");
const validateTask = require("../middleware/taskMiddleware");

// Show Dashboard (Home Page)
router.get("/", authMiddleware, taskController.getTasks);

// Create Task
router.post("/", authMiddleware, validateTask, taskController.createTask);

// Show Edit Task Form
router.get("/edit/:id", authMiddleware, taskController.editTaskForm);

// Update Task
router.post("/update/:id", authMiddleware, validateTask, taskController.updateTask);

// Delete Task
router.post("/delete/:id", authMiddleware, taskController.deleteTask);

module.exports = router;