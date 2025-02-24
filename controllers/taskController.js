const Task = require("../models/taskModel");
const validateTask = require("../middleware/taskMiddleware");

const taskController = {
  // Membuat Tugas Baru
  createTask: async (req, res) => {
    const { title, category, deadline, status } = req.body;
    const userId = req.user.id;
    
    // Validasi input
    if (!validateTask(req.body)) {
      return res.status(400).json({ message: "All fields are required" });
    }
    
    try {
      const taskId = await Task.create(userId, title, category, deadline, status);
      res.status(201).json({ taskId });
    } catch (err) {
      res.status(500).json({ message: "Task creation failed" });
    }
  },

  // Menampilkan semua tugas
  getTasks: async (req, res) => {
    const userId = req.user.id;
    try {
      const tasks = await Task.findAllByUserId(userId);
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch tasks" });
    }
  },

  // Mengupdate tugas
  updateTask: async (req, res) => {
    const { id } = req.params;
    const { title, category, deadline, status } = req.body;
    
    // Validasi input
    if (!validateTask(req.body)) {
      return res.status(400).json({ message: "All fields are required" });
    }
    
    try {
      await Task.update(id, title, category, deadline, status);
      res.json({ message: "Task updated" });
    } catch (err) {
      res.status(500).json({ message: "Task update failed" });
    }
  },

  // Menghapus tugas
  deleteTask: async (req, res) => {
    const { id } = req.params;
    try {
      await Task.delete(id);
      res.json({ message: "Task deleted" });
    } catch (err) {
      res.status(500).json({ message: "Task deletion failed" });
    }
  },
};

module.exports = taskController;
