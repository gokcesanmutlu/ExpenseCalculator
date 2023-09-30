//! Coming from HTML
const addBtn = document.getElementById("add-btn");
const priceInp = document.getElementById("price-inp");
const titleInp = document.querySelector("#title-inp");
const checkbox = document.getElementById("checked");
/* Type console.dir(checkbox) to see if the checkbox above is ticked.
  You can watch it by looking at the checked property. Checked: false if not ticked, true if ticked */
const list = document.getElementById("list");
const totalSpan = document.getElementById("price-info");
const select = document.querySelector("select");
const userInput = document.getElementById("user-input");

//! Event Listener
addBtn.addEventListener("click", addExpense);
list.addEventListener("click", handleUpdate);
select.addEventListener("change", handleFilter);
userInput.addEventListener("change", saveUser);
document.addEventListener("DOMContentLoaded", getUser);

//! Functions

// variables that contain information of total expenses
let totalPrice = 0;
// Let's write a function that updates both the sum variable and the interface.
function updateTotal(price) {
  totalPrice += price;
  //variables updated
  totalSpan.innerText = totalPrice;
  //sum area updated at HTML
}

// For adding a new expenses
function addExpense(event) {
  //it prevents to auto-refresh of page
  event.preventDefault();

  //Accesing input's value
  const title = titleInp.value;
  const price = priceInp.valueAsNumber;
  //copy> shift+alt+down arrow

  //! If any of inputs is empty; page gives alert and stop the function
  //If a value is empty, it is indicated by using an empty string or by adding an exclamation mark, such as !expense.

  if (title == "" || price == "") {
    alert("Please, fill the form.");
    return;
  }

  //!If inputs are fullfilled. Create a card and then send them to HTML
  //a- Creating Div
  const expenseDiv = document.createElement("div");

  //b- Adding class
  expenseDiv.classList.add("expense");

  if (checkbox.checked === true) {
    expenseDiv.classList.add("paid");
  }

  //c- Adjusting the div's content
  expenseDiv.innerHTML = `
   <h2 id="title">${title}</h2>
   <h2 id="price">${price}</h2>
   <div class="btns">
     <img id="update" src="ıcons/money.png" alt="">
     <img id="delete" src="ıcons/delete.png" alt="">
   </div>`;

  //d- Add child to parent element
  list.appendChild(expenseDiv);

  //e-Update the variables of total
  updateTotal(price);

  //! Cleaning 3 inputs
  titleInp.value = "";
  priceInp.value = "";
  checkbox.checked = false;
}

// For deleting expenses
function handleUpdate(event) {
  const ele = event.target;

  //accessing the container of the clicked element.
  const parent = ele.parentElement.parentElement;
  console.log(parent);

  // if the id of the clicked element is "delete", below code will work
  if (ele.id === "delete") {
    // To access the price of the element we deleted;
    const price = Number(parent.children[1].innerText);
    // toplamdan sildiğimiz fiyatı çıkartma
    updateTotal(-price);
    //Method to remove elements from HTML
    parent.remove();
  }

  // if the id of the clicked element is "update", below code will work
  if (ele.id === "update") {
    parent.classList.toggle("paid");
  }
}

//filters paid and unpaid
function handleFilter(event) {
  const selected = event.target.value;
  //Accesing the list item
  const items = list.childNodes;

  //For each element in the list, the query we will make with the switch will decide whether the element will be visible or not.
  items.forEach((item) => {
    //deciding on the action to be taken based on the selected value
    switch (selected) {
      case "all":
        if (item.classList.contains("paid")) {
          item.style.display = "flex";
        } else {
          item.style.display = "flex";
        }
        break;

      case "paid":
        if (item.classList.contains("paid")) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
        break;

      case "not-paid":
        if (item.classList.contains("paid")) {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }
        break;
    }
  });
}

// To saving user
function saveUser(event) {
  localStorage.setItem("username", event.target.value);
}

//gets the user from local and writes it to input
function getUser() {
  //gets the user from local
  const username = localStorage.getItem("username") || "";

  //writes it to input
  userInput.value = username;
}
