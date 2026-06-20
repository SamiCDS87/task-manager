// SIDEBAR
const menuItems = document.querySelectorAll(".menu-item");

menuItems.forEach(item => {
    item.addEventListener("click", () => {
        menuItems.forEach(i => {
            i.classList.remove("active");
        });
        item.classList.add("active");
    });
});

// AJOUTER UNE TÂCHE
const modal = document.querySelector("#task-modal");
const addTaskBtn = document.querySelector("#add-task-btn");
const createBtn = document.querySelector("#create-btn");
const cancelBtn = document.querySelector("#cancel-btn");
const taskTitleInput = document.querySelector("#task-title");
const taskDescriptionInput = document.querySelector("#task-description");
const todoColumn = document.querySelector("#todo");

addTaskBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
});

cancelBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
});

createBtn.addEventListener("click", () => {
    const title = taskTitleInput.value.trim();

    if (title === "") return;

    const task = {
        id: Date.now(),
        title: title,
        description: taskDescriptionInput.value.trim(),
        status: "todo"
    };

    tasks.push(task);
    renderTasks();
    saveTasks();
    taskTitleInput.value = "";
    taskDescriptionInput.value = "";
    modal.classList.add("hidden");
});

// DEPLACER UNE TÂCHE
const nextBtn = document.createElement("button");
nextBtn.textContent = "Déplacer";

nextBtn.addEventListener("click", () => {
    moveTask(task.id);
});

function moveTask(id) {
    const task = tasks.find(task => task.id === id);

    if (!task) return;

    if (task.status === "todo") {
        task.status = "doing";
    }
    else if (task.status === "doing") {
        task.status = "done";
    }

    saveTasks();
    renderTasks();
}

// SUPPRIMER UNE TÂCHE
const deleteBtn = document.createElement("button");
deleteBtn.textContent = "Supprimer";

deleteBtn.addEventListener("click", () => {
    deleteTask(task.id);
});

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

// AFFICHAGE DES CARTES
let tasks = [];

function renderTasks() {
    const todoColumn = document.querySelector("#todo");
    const doingColumn = document.querySelector("#doing");
    const doneColumn = document.querySelector("#done");

    todoColumn.innerHTML = "";
    doingColumn.innerHTML = "";
    doneColumn.innerHTML = "";

    tasks.forEach(task => {
        const taskCard = document.createElement("div");

        taskCard.classList.add("task-card");

        const titleElement = document.createElement("p");

        titleElement.textContent = task.title;
        taskCard.appendChild(titleElement);

        const descriptionElement = document.createElement("p");

        descriptionElement.classList.add("task-description");
        descriptionElement.textContent = task.description;

        if (task.description) {
            taskCard.appendChild(descriptionElement);
        }

        const actions = document.createElement("div");

        actions.classList.add("task-actions");

        const moveBtn = document.createElement("button");

        moveBtn.textContent = "Déplacer";
        moveBtn.addEventListener("click", () => {
            moveTask(task.id);
        });

        const deleteBtn = document.createElement("button");

        deleteBtn.textContent = "Supprimer";
        deleteBtn.addEventListener("click", () => {
            deleteTask(task.id);
        });

        actions.appendChild(moveBtn);
        actions.appendChild(deleteBtn);
        taskCard.appendChild(actions);

        if (task.status === "todo") {
            todoColumn.appendChild(taskCard);
        }

        if (task.status === "doing") {
            doingColumn.appendChild(taskCard);
        }

        if (task.status === "done") {
            doneColumn.appendChild(taskCard);
        }
    });

    updateCounters();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

function moveTask(id) {
    const task = tasks.find(task => task.id === id);

    if (task.status === "todo") {
        task.status = "doing";
    } else if (task.status === "doing") {
        task.status = "done";
    }

    saveTasks();
    renderTasks();
}

function updateCounters() {
    const todoCount = tasks.filter(task => task.status === "todo").length;

    const doingCount = tasks.filter(task => task.status === "doing").length;

    const doneCount = tasks.filter(task => task.status === "done").length;

    document.querySelector("#todo-count-sidebar").textContent = todoCount;
    document.querySelector("#doing-count-sidebar").textContent = doingCount;
    document.querySelector("#done-count-sidebar").textContent = doneCount;

    document.querySelector("#todo-count-column").textContent = todoCount;
    document.querySelector("#doing-count-column").textContent = doingCount;
    document.querySelector("#done-count-column").textContent = doneCount;
}

// SAUVEGARDE LOCALSTORAGE
function saveTasks() {
    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

// CHARGEMENT DES TÂCHES
function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        renderTasks();
    }
}

loadTasks();