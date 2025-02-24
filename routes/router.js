const express = require("express");
const authController = require("../controllers/authController");
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");
const taskMiddleware = require("../middleware/taskMiddleware");

const router = express.Router();

router.post("/register", authController.userRegister);
router.post("/auth/login", authController.userLogin);
router.delete("/auth/logout", authController.userLogout);
router.use(authMiddleware);

router.post("/tasks", taskController.createTask);
router.get("/tasks", taskController.getTasks);
router.put("/tasks/:id", taskController.updateTask);
router.delete("/tasks/:id", taskController.deleteTask);

module.exports = router;