const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const addButton = document.querySelector('.add-button');
const clearButton = document.querySelector('.clear-button');
const sortButton = document.querySelector('.sort-button');
const sortIcon = document.querySelector('.sort-icon');

let isAscending = true;


function addTask() {
    const taskText = todoInput.value.trim();
    if (!taskText) return;

    const listItem = document.createElement('li');
    listItem.className = 'todo-item';

    const text = document.createElement('span');
    text.className = 'todo-text';
    text.innerText = taskText;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-btn';
    deleteButton.innerText = '✕';

    listItem.appendChild(text);
    listItem.appendChild(deleteButton);
    todoList.appendChild(listItem);

    todoInput.value = '';
    clearButton.style.display = 'none';
}

clearButton.addEventListener('click', () => {
    todoInput.value = '';
    clearButton.style.display = 'none';
});

todoInput.addEventListener('input', () => {
    clearButton.style.display = todoInput.value ? 'block' : 'none';
});

addButton.addEventListener('click', addTask);

sortButton.addEventListener('click', () => {
    const tasks = Array.from(todoList.children);

    const sortedTasks = tasks.sort((a, b) => {
        const taskA = a.querySelector('.todo-text').innerText.toLowerCase().replace(/\d/g, ''); // Remove numbers
        const taskB = b.querySelector('.todo-text').innerText.toLowerCase().replace(/\d/g, ''); // Remove numbers
        return isAscending ? taskA.localeCompare(taskB) : taskB.localeCompare(taskA);
    });

    todoList.innerHTML = '';
    sortedTasks.forEach(task => todoList.appendChild(task));

    isAscending = !isAscending;
    sortIcon.src = isAscending ? 'pictures/down.jpg.jpg' : 'pictures/up.jpg.jpg';
});

todoList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const listItem = e.target.parentElement;
        listItem.remove();
    }
});


