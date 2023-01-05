let array = JSON.parse(localStorage.getItem("products"));

let sumPrice = document.querySelectorAll(".sumPrice");
let arrayresult = [];
let container = document.getElementById("container");
let count = 1;
let btn = document.querySelectorAll(".btn");
let footer = document.getElementById("footer");
let colorModal = document.getElementById("colorModal");
let sizeModal = document.getElementById("sizeModal");
let modalName = document.getElementById("modalName");
let totalpriceModal = document.getElementById("totalpriceModal");
let imgModal = document.getElementById("imgModal");
let deletebtn = document.getElementById("deletebtn");

//function add to dom--------------------------------------------------------------
function addToDom(item) {
  let html = `  <div class="containerCart">
   <div class="cartImg">
  <img src="${item.pic}" alt="" />
</div>
<div class="cart">
  <div class="row1">
    <p>${item.name}</p>
      <i class="fa fa-trash" id="${item.id}" onclick="showModal(${item.id})"></i>
  </div>
  <p>
    <span>size = </span><span>${item.size}</span> | <span>color</span>
    <span>${item.color}</span>
  </p>
  <div class="price">
    <p id="totalprice">$ ${item.price}.00</p>
  <div class="number"><span onclick="increse(${item.id})"> + </span> <span id="counter">${item.quantity}</span> <span onclick="decrese(${item.id})"/> - </span </div>
  </div>
</div>
 </div>
 
 `;
  container.insertAdjacentHTML("beforeend", html);

  colorModal.innerHTML = item.color;
  sizeModal.innerHTML = item.size;
  totalpriceModal.innerHTML = `$ ${item.price}.00`;
  modalName.innerHTML = item.name;
  imgModal.src = item.pic;
}
//function show Modal----------------------------------------------------------------------------------
function showModal(ItemId) {
  document.getElementById("deletebtn").dataset.id = ItemId;
  document.getElementById("id01").style.display = "block";
}

//function delete Item From Product ----------------------------------------------------------------------------------
function deleteItemFromCard() {
  document.getElementById("id01").style.display = "none";
  let id1 = Number(deletebtn.dataset.id);
  console.log(id1);
  getId(id1);
}

//function read products----------------------------------------------------------------------------------
function readProducts(array) {
  container.innerHTML = " ";
  array.forEach((element) => {
    if (element.color === undefined) {
      element.color = "monocrom";
    }
    addToDom(element);
    console.log(element);

    let sum = parseFloat(element.price);

    arrayresult.push(sum);
  });

  sum();
  arrayresult = [];
}
readProducts(array);
//function sum------------------------------------------------------------------------------------------
function sum() {
  if (arrayresult.length > 0) {
    arrayresult;
    let result = arrayresult
      .filter((e) => isFinite(e))
      .reduce((a, b) => parseInt(a) + parseInt(b));

    sumPrice.forEach((elem) => {
      elem.innerHTML = "$" + " " + result + ".00";
    });
  } else {
    sumPrice.forEach((elem) => {
      elem.innerHTML = "$" + " " + 0 + ".00";
    });
  }
}

//function remove-----------------------------------------------------------------------------------------------------
function getId(setId) {
  let remove = JSON.parse(localStorage.getItem("products"));
  let array2 = [];
  remove.forEach((e) => {
    if (e.id !== setId) {
      array2.push(e);
    }
  });
  console.log(array2);

  console.log(array2);
  localStorage.setItem("products", JSON.stringify(array2));
  readProducts(array2);
}

//function increadse--------------------------------------------------------------------------------------------------------------------------
function increse(id) {
  let products = JSON.parse(localStorage.getItem("products"));
  let array2 = [];
  products.forEach((e) => {
    if (e.id === id) {
      let sum = Number(e.quantity) + 1;
      e.quantity = sum;
      e.price = Number(e.price) + Number(e.price) / Number(sum - 1);
      array2.push(e);
    } else {
      array2.push(e);
    }
  });
  localStorage.setItem("products", JSON.stringify(array2));
  readProducts(array2);
}
//decrease------------------------------------------------------------------------------------------------------------------------------
function decrese(id) {
  let products = JSON.parse(localStorage.getItem("products"));
  let array2 = [];
  products.forEach((e) => {
    if (e.id === id) {
      let sum = Number(e.quantity) - 1;
      e.quantity = sum;
      e.price = Number(e.price) - Number(e.price) / Number(sum + 1);
      array2.push(e);
    } else {
      array2.push(e);
    }
  });
  readProducts(array2);
}
//function checkout-------------------------------------------------------------------------------------------------------------------------

btn.forEach((checkout) => {
  let array2 = [];

  checkout.addEventListener("click", () => {
    let tasksList = [];

    if (localStorage.getItem("order") == null) {
      tasksList = [];
    } else {
      tasksList = JSON.parse(localStorage.getItem("order"));
    }
    let products = JSON.parse(localStorage.getItem("products"));

    products.forEach((e) => {
      tasksList.push(e);
    });

    localStorage.setItem("products", JSON.stringify(array2));

    localStorage.setItem("order", JSON.stringify(tasksList));
    console.log(tasksList);
    container.innerHTML = " ";
    window.location.replace("/html/checkoutt.html");
  });
});
// function modal---------------------------------------------------------------------------------

// modal-------------------------------------------------------------------------------------------
