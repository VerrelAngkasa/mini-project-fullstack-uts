const db = require("../config/db");

// Mengambil semua task
async function getTasks(req, res) {
  db.query('SELECT * FROM tasks', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
}

// Menambah task
async function addTask(req, res) {
  const { title, category, deadline, status } = req.body;
  db.query('INSERT INTO tasks (title, category, deadline, status) VALUES (?, ?, ?, ?)',
    [title, category, deadline, status], (err) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ message: 'Task created' });
    });
}

// Mengupdate task
async function updateTask(req, res) {
  const { title, category, deadline, status } = req.body;
  db.query('UPDATE tasks SET title = ?, category = ?, deadline = ?, status = ? WHERE id = ?',
    [title, category, deadline, status, req.params.id], (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Task updated' });
    });
}

// Menghapus tugas
async function deleteTask(req, res) {
  db.query('DELETE FROM tasks WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Task deleted' });
  });
}

module.exports = { getTasks, addTask, updateTask, deleteTask };