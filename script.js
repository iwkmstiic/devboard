let todoList = document.getElementById("todo-list");
let doneList = document.getElementById("done-list");
let input = document.getElementById("todo-input");
let stateKey = "devboard-todo-state";
let savedState = JSON.parse(localStorage.getItem(stateKey) || "null");

let todos = savedState ? savedState.todos : Array.from(todoList.children).map(function(item) {
	return item.textContent;
}).concat(JSON.parse(localStorage.getItem("devboard-todos") || "[]"));
let doneTodos = savedState ? savedState.doneTodos : Array.from(doneList.children).map(function(item) {
	return item.textContent;
});

function saveTodos() {
	localStorage.setItem(stateKey, JSON.stringify({ todos: todos, doneTodos: doneTodos }));
}

function renderLists() {
	todoList.innerHTML = "";
	doneList.innerHTML = "";

	todos.forEach(function(todoText) {
		let listItem = document.createElement("li");
		listItem.textContent = todoText;
		todoList.appendChild(listItem);
	});

	doneTodos.forEach(function(todoText) {
		let listItem = document.createElement("li");
		listItem.textContent = todoText;
		doneList.appendChild(listItem);
	});
}

function addTodo() {
	let todoText = input.value.trim();
	if (todoText !== "") {
		todos.push(todoText);
		saveTodos();
		renderLists();
		input.value = "";
	}
}

todoList.addEventListener("click", function(event) {
	let clickedTodo = event.target;
	let todoIndex = Array.from(todoList.children).indexOf(clickedTodo);

	if (todoIndex !== -1) {
		doneTodos.push(todos.splice(todoIndex, 1)[0]);
		saveTodos();
		renderLists();
	}
});

renderLists();
saveTodos();