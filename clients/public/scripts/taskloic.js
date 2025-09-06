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
  console.log(taskList);
  const API_URL = "http://localhost:5000/api/tasks";

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

  // Load tasks from backend
  async function fetchTasks() {
    taskList.innerHTML = "<p>Loading tasks...</p>";
    try {
      const res = await fetch(API_URL);
      const tasks = await res.json();
      taskList.innerHTML = "";
      tasks.forEach((task) => renderTask(task));
    } catch (err) {
      taskList.innerHTML = `<p class="text-red-500">Failed to load tasks: ${
        err.message || "check your internet connection"
      }</p>`;
      console.error("Error fetching tasks:", err);
    }
  }

  // Render a single task
  function renderTask(task) {
    const li = document.createElement("li");
    li.className =
      "bg-white p-3 rounded-lg shadow space-y-2 border border-gray-200";
    li.dataset.id = task._id;

    const header = document.createElement("h3");
    header.textContent = task.title;
    header.className = "font-semibold text-lg";

    const description = document.createElement("p");
    description.textContent = task.description;
    description.className = "text-gray-700";

    const actions = document.createElement("div");
    actions.className = "space-x-2";

    // Edit button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className =
      "px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition";
    editBtn.onclick = () => startEdit(task, li);

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className =
      "px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition";
    deleteBtn.onclick = () => deleteTask(task._id, li);

    actions.append(editBtn, deleteBtn);
    li.append(header, description, actions);
    taskList.appendChild(li);
  }

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

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description: desc }),
      });
      const newTask = await res.json();
      renderTask(newTask);
      taskTitle.value = "";
      taskInput.value = "";
    } catch (err) {
      taskTitle.innerHTML = `<p class="text-red-500">Failed to load tasks: ${
        err.message || "check your internet connection"
      }</p>`;
      console.error("Error adding task:", err);
    }
  });

  // Delete task
  async function deleteTask(id, li) {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      li.remove();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  }

  // Edit task
  function startEdit(task, li) {
    li.innerHTML = "";

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.value = task.title;
    titleInput.className = "w-full border border-gray-300 rounded-lg p-2 mb-2";

    const descInput = document.createElement("textarea");
    descInput.value = task.description;
    descInput.rows = 3;
    descInput.className = "w-full border border-gray-300 rounded-lg p-2";

    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    saveBtn.className =
      "mt-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition";

    const errorBox = document.createElement("p");
    errorBox.className = "text-red-500 text-sm mt-1 hidden";

    li.append(titleInput, descInput, saveBtn, errorBox);

    saveBtn.onclick = async () => {
      const newTitle = titleInput.value.trim();
      const newDesc = descInput.value.trim();

      if (!newTitle || !newDesc) {
        errorBox.textContent = "Both fields are required.";
        errorBox.classList.remove("hidden");
        return;
      }

      try {
        const res = await fetch(`${API_URL}/${task._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: newTitle, description: newDesc }),
        });
        const updatedTask = await res.json();
        li.innerHTML = "";
        renderTask(updatedTask);
      } catch (err) {
        console.error("Error updating task:", err);
      }
    };
  }

  fetchTasks();
}

export default Task;
