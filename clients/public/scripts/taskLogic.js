import checkTokenAndLogout from "./checkTokenAndLogout.js";
import decodeToken from "./decode.js";
import logout from "./logout.js";
import { showButtonLoader, hideButtonLoader } from "./Loader.js";
import showToast from "./showToast.js";

function Task() {
  const taskForm = document.getElementById("taskForm");
  const taskTitle = document.getElementById("taskTitle");
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");
  const titleError = document.getElementById("titleError");
  const descError = document.getElementById("descError");
  const toggleBtn = document.getElementById("menu-toggle");
  const sidebar = document.getElementById("sidebar");
  const closemain = document.getElementById("closesidebar");
  const admin_name = document.getElementById("admin_name");
  const logoutntn = document.getElementById("logout");

  //logout logic
  logoutntn.addEventListener("click", () => {
    logout();
  });

  //get token from storage
  const token = localStorage.getItem("token");

  const userData = decodeToken(token);

  //chcek if token expire to logout user
  checkTokenAndLogout(userData);

  admin_name.textContent = ` Welcome, ${userData.username} 👋`;
  const API_URL = "http://localhost:9000/api";

  // Sidebar toggle
  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("-translate-x-full");
  });

  closemain.addEventListener("click", () => {
    if (
      !sidebar.classList.contains("-translate-x-full") &&
      window.innerWidth < 768
    ) {
      sidebar.classList.add("-translate-x-full");
    }
  });

  // Load tasks from  api
  async function fetchTasks() {
    taskList.innerHTML = "<p>Loading tasks...</p>";
    showButtonLoader();
    try {
      const res = await fetch(`${API_URL}/gettodo`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const tasks = await res.json();
      console.log(tasks);
      const taskdata = tasks.data;
      //if task is empty
      if (!taskdata || taskdata.length === 0) {
        taskList.innerHTML =
          "<div class='text-gray-500'>No tasks found. your will appear here if you creat any</div>";
        return;
      }
      taskList.innerHTML = "";
      taskdata.forEach((task) => renderTask(task));
    } catch (err) {
      taskList.innerHTML = `<p class="text-red-500">Failed to load tasks: ${
        err.message || "check your internet connection"
      }</p>`;
      console.error("Error fetching tasks:", err);
    } finally {
      hideButtonLoader("Add Task");
    }
  }

  function renderTask(task, existingLi) {
    const li = existingLi || document.createElement("li");
    li.className =
      "bg-white p-3 rounded-lg border border-gray-300 shadow space-y-2";
    const timestamp = document.createElement("p");
    timestamp.className = "text-[3px] mt-4";
    li.dataset.id = task._id;

    li.innerHTML = "";

    const titleText = task.description;
    task.description.charAt(0).toUpperCase() + task.description.slice(1);

    const header = document.createElement("h3");
    header.textContent = titleText;
    header.className = "font-semibold text-lg";
    timestamp.textContent = `Created at ${task.createdAt}`;

    const description = document.createElement("p");
    description.textContent = task.todo || "No Description";
    description.className = "text-gray-700 text-sm";

    const actions = document.createElement("div");
    actions.className = "space-x-2";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className =
      "px-2 py-1 bg-yellow-500 text-sm text-white rounded hover:bg-yellow-600 transition";
    editBtn.onclick = () => startEdit(task, li);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className =
      "px-2 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition";
    deleteBtn.onclick = () => deleteTask(task._id, li);

    actions.append(editBtn, deleteBtn);
    li.append(header, description, timestamp, actions);

    // Only append if this is a new task
    if (!existingLi) taskList.appendChild(li);
  }
  // Create new task
  taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // clear errors
    titleError.textContent = "";
    titleError.classList.add("hidden");
    descError.textContent = "";
    descError.classList.add("hidden");

    const title = taskTitle.value.trim();
    const desc = taskInput.value.trim();
    let hasError = false;

    if (!title) {
      titleError.textContent = "Task title is required.";
      titleError.classList.remove("hidden");
      hasError = true;
    }
    if (!desc) {
      descError.textContent = "Task description is required.";
      descError.classList.remove("hidden");
      hasError = true;
    }
    if (hasError) return;

    showButtonLoader("creating...");
    try {
      const res = await fetch(`${API_URL}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ description: title, todo: desc }),
      });
      const newTask = await res.json();
      if (newTask.success) {
        showToast(newTask.message, "bg-green-500");
        renderTask(newTask.data);
        taskTitle.value = "";
        taskInput.value = "";
      } else {
        showToast(newTask.message, "bg-red-500");
      }
    } catch (err) {
      console.error("Error adding task:", err);
      showToast(err.message || "Failed to add task", "bg-red-500");
    } finally {
      hideButtonLoader("Add Task");
    }
  });
  // Delete task
  async function deleteTask(id, li) {
    try {
      const res = await fetch(`${API_URL}/deletetodo/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        method: "DELETE",
      });
      const data = await res.json();
      li.remove();
      showToast(data.message);
    } catch (err) {
      showToast("bg-red-500", err.message);
      console.error("Error deleting task:", err);
    }
  }

  // Edit task
  function startEdit(task, li) {
    // Clear li
    li.innerHTML = "";

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.value = task.description || "";
    titleInput.className = "w-full border border-gray-300 rounded-lg p-2 mb-2";

    const descInput = document.createElement("textarea");
    descInput.value = task.todo || "";
    descInput.rows = 3;
    descInput.className = "w-full border border-gray-300 rounded-lg p-2";

    const saveBtn = document.createElement("button");
    // const savespan = document.createElement("span");
    saveBtn.textContent = "Save";

    saveBtn.className =
      "mt-2 px-3 py-1 text-sm bg-gray-800 text-white rounded hover:bg-green-700 transition";

    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancel";
    cancelBtn.className =
      "mt-2 ml-2 px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-700 transition";

    const errorBox = document.createElement("p");
    errorBox.className = "text-red-500 text-sm mt-1 hidden";

    li.append(titleInput, descInput, saveBtn, cancelBtn, errorBox);

    cancelBtn.onclick = () => {
      renderTask(task, li);
    };

    saveBtn.onclick = async () => {
      const newTitle = titleInput.value.trim();
      const newDesc = descInput.value.trim();

      if (!newTitle || !newDesc) {
        errorBox.textContent = "Both fields are required.";
        errorBox.classList.remove("hidden");
        return;
      }
      saveBtn.textContent = "Editing....";
      saveBtn.disabled = true;
      try {
        const res = await fetch(`${API_URL}/updatetodo/${task._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            description: newTitle,
            todo: newDesc,
          }),
        });

        const updatedTask = await res.json();

        if (!updatedTask.data) throw new Error("Failed to update task.");

        renderTask(updatedTask.data, li);
        showToast(updatedTask.message);
      } catch (err) {
        console.error("Error updating task:", err);
      } finally {
        saveBtn.textContent = "Save";
      }
    };
  }
  fetchTasks();
}

export default Task;
