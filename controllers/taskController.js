const Task = require("../models/taskModel");

// Membuat tugas baru
async function addTask(req, res) {
  const { title, category, deadline } = req.body;
  try {
    const task = new Task({ title, category, deadline, user: req.user.id });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Mengambil / Menampilkan semua data tugas
async function getTasks(req, res) {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Mengupdate / Memperbaruhi data tugas sesuai dengan _id
async function updateTask(req, res) {
  const { _id } = req.params;
  const { title, category, deadline, status } = req.body;
  try {
    const task = await Task.findByIdAndUpdate(_id, { title, category, deadline, status }, { new: true });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Menghapus data tugas sesuai dengan id
async function deleteTask(req, res) {
  const { _id } = req.params;
  try {
    const task = await Task.findByIdAndDelete(_id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = { addTask, getTasks, updateTask, deleteTask };