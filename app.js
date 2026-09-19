const STORAGE_KEY = "offline-todo-list";

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const emptyMessage = document.querySelector("#empty-message");
const remainingCount = document.querySelector("#remaining-count");
const themeToggle = document.querySelector("#theme-toggle");
const filterButtons = document.querySelectorAll(".filter-button");

let todos = loadTodos();
let currentFilter = "all";

// 根據手動選擇或作業系統設定套用顯示主題。
function applyTheme() {
  const savedTheme = localStorage.getItem("todo-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = savedTheme ? savedTheme === "dark" : prefersDark;

  document.body.classList.toggle("dark-theme", isDark);
  themeToggle.textContent = isDark ? "☀️ 淺色模式" : "🌙 深色模式";
  themeToggle.setAttribute("aria-pressed", String(isDark));
}

// 沒有手動選擇時，作業系統主題變更也同步更新畫面。
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
  if (!localStorage.getItem("todo-theme")) {
    applyTheme();
  }
});

// 從瀏覽器儲存空間讀取待辦資料，資料損壞時回傳空清單。
function loadTodos() {
  try {
    const savedTodos = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(savedTodos) ? savedTodos : [];
  } catch {
    return [];
  }
}

// 將目前清單同步保存到瀏覽器儲存空間。
function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// 依目前篩選模式取得要顯示的待辦項目。
function getVisibleTodos() {
  if (currentFilter === "active") {
    return todos.filter((todo) => !todo.completed);
  }

  if (currentFilter === "completed") {
    return todos.filter((todo) => todo.completed);
  }

  return todos;
}

// 根據目前資料重新繪製畫面與未完成數量。
function renderTodos() {
  todoList.replaceChildren();
  const visibleTodos = getVisibleTodos();

  visibleTodos.forEach((todo) => {
    const item = document.createElement("li");
    item.className = "todo-item";
    if (todo.completed) {
      item.classList.add("completed");
    }

    const checkbox = document.createElement("input");
    checkbox.className = "todo-checkbox";
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.setAttribute("aria-label", `完成待辦事項：${todo.text}`);
    checkbox.addEventListener("change", () => {
      todo.completed = checkbox.checked;
      saveTodos();
      renderTodos();
    });

    const text = document.createElement("span");
    text.className = "todo-text";
    text.textContent = todo.text;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.type = "button";
    deleteButton.textContent = "刪除";
    deleteButton.setAttribute("aria-label", `刪除待辦事項：${todo.text}`);
    deleteButton.addEventListener("click", () => {
      todos = todos.filter((currentTodo) => currentTodo.id !== todo.id);
      saveTodos();
      renderTodos();
    });

    item.append(checkbox, text, deleteButton);
    todoList.append(item);
  });

  const unfinishedCount = todos.filter((todo) => !todo.completed).length;
  remainingCount.textContent = `未完成:${unfinishedCount} 項`;
  emptyMessage.textContent = todos.length === 0
    ? "還沒有任何待辦事項,新增一個吧!"
    : "目前篩選沒有符合的待辦事項。";
  emptyMessage.hidden = visibleTodos.length > 0;
}

themeToggle.addEventListener("click", () => {
  const isDark = !document.body.classList.contains("dark-theme");
  localStorage.setItem("todo-theme", isDark ? "dark" : "light");
  applyTheme();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    filterButtons.forEach((filterButton) => {
      filterButton.classList.toggle("active", filterButton === button);
    });
    renderTodos();
  });
});

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = todoInput.value.trim();

  if (!text) {
    todoInput.focus();
    return;
  }

  todos.push({
    id: Date.now(),
    text,
    completed: false,
  });
  saveTodos();
  renderTodos();
  todoForm.reset();
  todoInput.focus();
});

applyTheme();
renderTodos();
