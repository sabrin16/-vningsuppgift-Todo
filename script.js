//script.js
document.addEventListener('DOMContentLoaded', loadTodos);

const form = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

let todos = [];

// Lägg till todo
form.addEventListener('submit', function (e) {
    e.preventDefault();
    addTodo(todoInput.value);
    todoInput.value = '';
});

// Ladda todos från localStorage
function loadTodos() {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
        todos = JSON.parse(storedTodos);
        todos.forEach(todo => renderTodo(todo));
    }
}

// Lägg till och rendera en ny todo
function addTodo(title) {
    const newTodo = {
        id: Date.now(),
        title: title,
        completed: false
    };

    todos.push(newTodo);
    renderTodo(newTodo);
    saveTodos();
}

// Rendera en todo i DOM:en
function renderTodo(todo) {
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.dataset.id = todo.id;

    const completeButton = li.querySelector('.complete-button');
    if (completeButton) {
        completeButton.style.display = 'none'; 
    }

    document.querySelector('#todo-list').append(li);

    if (todo.completed) {
        li.classList.add('completed');
    }

    li.innerHTML = `
        <input type="checkbox" class="complete-checkbox" ${todo.completed ? 'checked' : ''}>
        <span>${todo.title}</span>
        <button class="complete-button"><i class="fa-solid fa-check"></i></button>
        <button class="delete-button"><i class="fa-solid fa-xmark"></i></button>
    `;

    todoList.appendChild(li);

    //Event för att markera som klar 

    li.querySelector('.complete-checkbox').addEventListener('change', () => togleComplete(todo.id));

    //Event för att ta bort todo

    li.querySelector('.delete-button').addEventListener('click', () => removeTodo(todo.id));
}

// Markera todo som klar/inte klar
function togleComplete(id) {
    const todo = todos.find(todo => todo.id == id);
    todo.completed = !todo.completed;

    const todoElement = document.querySelector(`[data-id='${id}']`);  
    todoElement.classList.toggle('completed');

    saveTodos();
}

document.addEventListener('DOMContentLoaded', function() {

document.querySelectorAll('.complete-button').forEach(function(button) {
    button.style.display = 'none';
    });
});

// Ta bort todo från listan 
function removeTodo(id) {
    todos = todos.filter(todo => todo.id != id);
    const todoElement = document.querySelector(`[data-id='${id}']`);
    todoElement.remove();

    saveTodos();
}

// Spara todos till localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}
