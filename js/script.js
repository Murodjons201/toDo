let elForm = document.querySelector(".form");
let elformInputName = document.querySelector(".form__input-name");
let elFormInput = document.querySelector(".form__input");
let elToDoList = document.querySelector(".to__do__list");
let elToDoHeading = document.querySelector(".to__do__heading");

let sequenceNumber = 0;

elForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  let inputValue = elFormInput.value;
  let inputValueName = elformInputName.value;

  sequenceNumber++;

  elToDoHeading.textContent = `${inputValueName.toUpperCase()} sizning kunlik rejanggiz:`;

  let newItem = document.createElement("li");
  newItem.textContent = `${sequenceNumber}.  ${inputValue}`;
  newItem.classList.add("list-group-item");
  newItem.classList.add("border");
  newItem.classList.add("border-primary");
  newItem.classList.add("rounded");
  newItem.classList.add("rounded-pill");
  newItem.classList.add("text-primary");
  newItem.classList.add("mb-2");
  newItem.classList.add("p-2");
  newItem.classList.add("px-4");
  elToDoList.appendChild(newItem);

  elFormInput.value = null;
});
