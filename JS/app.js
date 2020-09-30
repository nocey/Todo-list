const todoForm = document.querySelector("#todo-form"); //?
const formText = document.querySelector("#form-text");
const todoUl = document.querySelector("#todo-ul");
const addTodoi = document.querySelector("#add-todo");
const todoDel = document.querySelector("#del-todo");
const trashCans = document.querySelector("#todo-list");
const todoSearch = document.querySelector("#todo-search");
const todoAllDel = document.querySelector("#todo-del"); //? todo delete button


/*
* comments
? comments
! danger
todo yapılacaklar
*/
function eventListeners() {
    todoForm.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodo);
    // ? todoDel.addEventListener("click", todoDel);
    trashCans.addEventListener("click", todoDele);
    todoSearch.addEventListener("keyup", todoSearchfunc);
    todoAllDel.addEventListener("click", todoAllDelete);
}

function todoAllDelete() {
    const listStorage = getTodoFromStorage();
    const liste = document.querySelectorAll("li");
    listStorage.forEach(function(e) {
        dellTodoToStorage(e);
    });
    liste.forEach(function(e) {
        e.remove();
    })
}

function todoSearchfunc(e) {
    const filterValue = e.target.value.toLowerCase();
    const listitems = document.querySelectorAll("li");
    listitems.forEach(function(e) {
        const text = e.textContent.toLowerCase();
        if (text.indexOf(filterValue) === -1) {
            e.setAttribute("style", "display : none");
        } else {
            e.setAttribute("style", "display : block");
        }
    });
}

function todoDele(e) {
    let todos = getTodoFromStorage();

    if (e.target.className === "far fa-trash-alt") {
        e.target.parentElement.parentElement.remove();
        dellTodoToStorage(e.target.parentElement.parentElement.textContent);
    }
}

function loadAllTodo() {
    let todos = getTodoFromStorage();

    todos.forEach(function(todo) {
        todoCreate(todo);
    });
}

function addTodo(e) {
    const newTodos = formText.value.trim();

    if (newTodos === "") {
        showAlert("Todo girmeyi unuttunuz ...");
    } else {
        todoCreate(newTodos);
        formText.value = "";
        addTodoToStorage(newTodos);
    }



    e.preventDefault();
}

function todoCreate(message) { // todo oluşturma function
    /*<li>
            <p>Todo 1</p>
            <a href="#" class="remove">
                <i class="far fa-trash-alt"></i>
            </a>
        </li>*/
    //List İtem Creating
    const il = document.createElement("li");
    const a = document.createElement("a");
    a.href = "#";
    a.className = "remove";
    a.innerHTML = "<i class='far fa-trash-alt'></i>";
    il.appendChild(document.createTextNode(message));
    il.appendChild(a);
    todoUl.appendChild(il);
}

function showAlert(message) { // alert oluşturma
    /*
    <div class="alert ortalama"></div>
    */
    const div = document.createElement("div");
    div.className = "alert ortalama";
    div.innerHTML = message;
    addTodoi.appendChild(div);
    setTimeout(function() {
        div.remove();
    }, 3000);
}

function getTodoFromStorage() { // storege içindeki tüm todo'ları çekebiliriz.
    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function addTodoToStorage(newTodo) { // storege içindeki tüm todo'ları yeni ekleme
    let todos = getTodoFromStorage(newTodo);
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function dellTodoToStorage(deltodo) { // storege içindeki tüm todo'ları silme
    let todos = getTodoFromStorage();
    todos.forEach(function(e, index) {
        if (e === deltodo) {
            todos.splice(index, 1);
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}
eventListeners();