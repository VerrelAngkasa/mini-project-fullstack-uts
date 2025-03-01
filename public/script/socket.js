// Script untuk menangani notifikasi real-time dengan Socket.IO

document.addEventListener('DOMContentLoaded', function() {
  // Dapatkan token JWT dari cookies
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  const token = getCookie('token');
  if (!token) {
    console.error('Token not found. Socket connection failed.');
    return;
  }

  // Inisialisasi koneksi Socket.IO
  const socket = io({
    query: {
      token
    }
  });

  // Event ketika terhubung
  socket.on('connect', function() {
    console.log('Connected to Socket.IO server');
  });

  // Event ketika terputus
  socket.on('disconnect', function() {
    console.log('Disconnected from Socket.IO server');
  });

  // Event ketika ada error
  socket.on('connect_error', function(error) {
    console.error('Socket.IO connection error:', error);
  });

  // Event ketika menerima notifikasi tugas baru
  socket.on('newTask', function(data) {
    showNotification(data.message);
    
    // Refresh daftar tugas
    fetchTasks();
  });

  // Fungsi untuk menampilkan notifikasi
  function showNotification(message) {
    const notificationArea = document.getElementById('notificationArea');
    const notificationMessage = document.getElementById('notificationMessage');
    notificationMessage.textContent = message;
    notificationArea.classList.remove('d-none');
    setTimeout(() => {
      notificationArea.classList.add('d-none');
    }, 5000);
  }

  // Fungsi untuk mengambil tugas terbaru
  function fetchTasks() {
    fetch('/tasks', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        renderTasks(data.data);
      } else {
        console.error('Error:', data.message);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  // Fungsi untuk merender daftar tugas
  function renderTasks(tasks) {
    const taskListContainer = document.getElementById('taskList');
    let html = '';

    if (tasks.length === 0) {
      html = `
        <div class="text-center py-5">
          <i class="fas fa-tasks fs-1 text-muted mb-3"></i>
          <p class="lead">Belum ada tugas. Silakan tambahkan tugas baru.</p>
        </div>
      `;
    } else {
      html = `
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Judul</th>
                <th>Kategori</th>
                <th>Deadline</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
      `;

      tasks.forEach((task) => {
        const deadline = new Date(task.deadline).toLocaleDateString('id-ID', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        });
        const categoryClass = task.category === 'Kuliah' ? 'bg-primary' : task.category === 'Organisasi' ? 'bg-success' : 'bg-info';
        const statusClass = task.status === 'Belum Selesai' ? 'bg-danger' : task.status === 'Sedang Dikerjakan' ? 'bg-warning' : 'bg-success';

        html += `
          <tr data-id="${task._id}">
            <td>${task.title}</td>
            <td><span class="badge ${categoryClass}">${task.category}</span></td>
            <td>${deadline}</td>
            <td><span class="badge ${statusClass}">${task.status}</span></td>
            <td>
              <div class="btn-group btn-group-sm">
                <button class="btn btn-outline-primary edit-task" data-bs-toggle="modal" data-bs-target="#editTaskModal" data-id="${task._id}">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-outline-danger delete-task" data-id="${task._id}">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </td>
          </tr>
        `;
      });

      html += `
            </tbody>
          </table>
        </div>
      `;
    }

    taskListContainer.innerHTML = html;
  }
});