//HTML DAN ELEMENT CHAQIRISH:
let elForm = document.querySelector(".form");
let elformInputName = document.querySelector(".form__input-name");
let elFormInput = document.querySelector(".form__input");
let elList = document.querySelector(".list");
let elToDoHeading = document.querySelector(".todo__heading");

//GENERATE ELEMENT:
let elAllBtn = document.querySelector(".btn-all");
let elCompletedBtn = document.querySelector(".btn-completed");
let elUnCompletedBtn = document.querySelector(".btn-uncompleted");

//COUNTER ELEMENT:
let elAllCount = document.querySelector(".all-count");
let elCompletedCount = document.querySelector(".completed-count");
let elUnCompletedCount = document.querySelector(".uncompleted-count");

//BUSH ERRAY

const renderTodos = function (arr, element) {
  //COUNTERLAR:
  elAllCount.textContent = todos.length;

  elCompletedCount.textContent = todos.filter(
    (todo) => todo.isCompleted
  ).length;

  elUnCompletedCount.textContent = todos.filter(
    (todo) => !todo.isCompleted
  ).length;

  arr.forEach(function (todo) {
    //CREATEELEMENT:
    let newItem = document.createElement("li");
    let newDesc = document.createElement("p");
    let newCheckbox = document.createElement("input");
    let newDeleteBtn = document.createElement("button");

    //TYPE:
    newCheckbox.type = "checkbox";

    //CLASSLIST:

    newItem.classList.add("list__item");
    newDesc.classList.add("list__item-desc");
    newDeleteBtn.classList.add("delete-btn");
    newCheckbox.classList.add("checkbox-btn");

    //DATASET:
    newDeleteBtn.dataset.todoDeleteId = todo.id;
    newCheckbox.dataset.checkId = todo.id;

    //TEXTCONTENT:
    newDesc.textContent = todo.title;
    newDeleteBtn.textContent = "x";

    //CHECKKED TRUE:
    if (todo.isCompleted) {
      newCheckbox.checked = true;
      newDesc.classList.add("list__item-desc-check");
    }

    //APPENDCHILD:
    element.appendChild(newItem);
    newItem.appendChild(newCheckbox);
    newItem.appendChild(newDesc);
    newItem.appendChild(newDeleteBtn);
  });
};

const localTodos = JSON.parse(window.localStorage.getItem("localTodos"));

let todos = localTodos || [];

renderTodos(todos, elList);

//EVENT DELEGATION:
elList.addEventListener("click", function (evt) {
  if (evt.target.matches(".delete-btn")) {
    let btnTodoId = evt.target.dataset.todoDeleteId * 1;

    let foundTodoIndex = todos.findIndex((todo) => todo.id === btnTodoId);

    todos.splice(foundTodoIndex, 1);

    elList.innerHTML = null;

    window.localStorage.setItem("localTodos", JSON.stringify(todos));

    if (localTodos.length === 0) {
      window.localStorage.removeItem("localTodos");
    }

    renderTodos(todos, elList);
  } else if (evt.target.matches(".checkbox-btn")) {
    let checkTodoId = evt.target.dataset.checkId * 1;

    let foundCheckTodo = todos.find((todo) => todo.id === checkTodoId);

    foundCheckTodo.isCompleted = !foundCheckTodo.isCompleted;

    elList.innerHTML = null;

    window.localStorage.setItem("localTodos", JSON.stringify(todos));

    renderTodos(todos, elList);
  }
});

//DINAMIK BOLISHI UCHUN FUNCTION OCHIB PARAMETR BERDIK:

elForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  let inputValue = elFormInput.value;
  let inputValueName = elformInputName.value;
  elToDoHeading.textContent = `${inputValueName.toUpperCase()} sizning kunlik rejanggiz:`;

  let newTodo = {
    id: todos[todos.length - 1]?.id + 1 || 0,
    title: inputValue,
    isCompleted: false,
  };

  todos.push(newTodo);

  window.localStorage.setItem("localTodos", JSON.stringify(todos));

  elFormInput.value = null;
  elList.innerHTML = null;

  renderTodos(todos, elList);
});

//GENERATE:
elAllBtn.addEventListener("click", function () {
  elList.innerHTML = null;

  renderTodos(todos, elList);
});

elCompletedBtn.addEventListener("click", function () {
  let generateComplete = todos.filter((todo) => todo.isCompleted);

  elList.innerHTML = null;

  renderTodos(generateComplete, elList);
});

elUnCompletedBtn.addEventListener("click", function () {
  let generateUnComplete = todos.filter((todo) => !todo.isCompleted);

  elList.innerHTML = null;

  renderTodos(generateUnComplete, elList);
});
