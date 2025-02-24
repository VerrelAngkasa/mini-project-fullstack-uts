const API_URL = "http://localhost:3000";

// Register User
async function register() {
    const username = document.getElementById("regUsername").value;
    const password = document.getElementById("regPassword").value;
    
    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
        alert("Registrasi berhasil!");
        window.location.href = "login.html";
    } else {
        alert("Registrasi gagal!");
    }
}

// Login User
async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
        localStorage.setItem("token", data.token);
        window.location.href = "dashboard.html";
    } else {
        alert("Login gagal!");
    }
}

// Logout User
function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}

// Fetch Tasks
async function getTasks() {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/tasks`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` },
    });

    const tasks = await response.json();
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerText = `${task.title} - ${task.category} - ${task.deadline} - ${task.status}`;
        taskList.appendChild(li);
    });
}

// Add Task
async function addTask() {
    const title = document.getElementById("taskTitle").value;
    const category = document.getElementById("taskCategory").value;
    const deadline = document.getElementById("taskDeadline").value;
    const status = "Belum Selesai";
    const token = localStorage.getItem("token");

    await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title, category, deadline, status }),
    });

    getTasks();
}

// Cek apakah halaman dashboard sedang dibuka
if (window.location.pathname.includes("dashboard.html")) {
    getTasks();
}