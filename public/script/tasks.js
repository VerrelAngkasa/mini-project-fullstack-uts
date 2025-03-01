document.addEventListener('DOMContentLoaded', function() {
  const taskForm = document.getElementById('taskForm');
  const taskList = document.getElementById('taskList');

  if (taskForm) {
      taskForm.addEventListener('submit', handleTaskSubmit);
  }

  // Load tasks on page load
  fetchTasks();

  async function handleTaskSubmit(e) {
      e.preventDefault();
      const formData = new FormData(taskForm);
      
      try {
          const response = await fetch('/tasks/create', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(Object.fromEntries(formData)),
          });
          const data = await response.json();
          
          if (data.success) {
              showNotification('Tugas berhasil ditambahkan', 'success');
              fetchTasks();
              taskForm.reset();
          }
      } catch (error) {
          showNotification('Gagal menambahkan tugas', 'error');
      }
  }

  function renderTasks(tasks) {
      if (!taskList) return;
      
      taskList.innerHTML = tasks.map(task => `
          <div class="task-card ${task.status.toLowerCase()}" data-id="${task._id}">
              <h3>${task.title}</h3>
              <p>${task.description}</p>
              <div class="task-meta">
                  <span class="badge ${task.category.toLowerCase()}">${task.category}</span>
                  <span class="deadline">Deadline: ${new Date(task.deadline).toLocaleDateString()}</span>
              </div>
              <div class="task-actions">
                  <button onclick="updateTaskStatus('${task._id}', 'Selesai')" 
                          class="btn btn-success btn-sm">Selesai</button>
                  <button onclick="deleteTask('${task._id}')" 
                          class="btn btn-danger btn-sm">Hapus</button>
              </div>
          </div>
      `).join('');
  }
});