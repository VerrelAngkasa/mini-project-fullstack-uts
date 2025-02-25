const db = require("../config/db");

// Schema database MySQL tasks
const Task = {
  create: async (title, category, deadline, status) => {
    const [result] = await db.promise().query(
      "INSERT INTO tasks (title, category, deadline, status) VALUES (?, ?, ?, ?)",
      [title, category, deadline, status]
    );
    return result.insertId;
  },
  findAllByUserId: async (userId) => {
    const [rows] = await db.promise().query("SELECT * FROM tasks WHERE user_id = ?", [userId]);
    return rows;
  },
  update: async (taskId, title, category, deadline, status) => {
    await db.promise().query(
      "UPDATE tasks SET title = ?, category = ?, deadline = ?, status = ? WHERE id = ?",
      [title, category, deadline, status, taskId]
    );
  },
  delete: async (taskId) => {
    await db.promise().query("DELETE FROM tasks WHERE id = ?", [taskId]);
  },
};

module.exports = Task;
