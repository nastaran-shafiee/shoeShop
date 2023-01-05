let products = document.getElementById("products");
const API_URL = "https://6396e1e077359127a0255a95.mockapi.io";
let slideIndex = 1;
let increase = document.getElementById("increase");
let decrease = document.getElementById("decreace");
let count = 1;
let addTocart = document.getElementById("addTocart");
let array = [];
let sizeArray = [];
let sizeColor = [];

// slider--------------------------------------------------------------------------------------------------

function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}
//function show slide
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}
//add to dom-----------------------------------------------------------------------------------------------

function addToDom(item) {
  let heartID = Date.now;
  const html = `
  <div class="container">
  <div class="slideshow-container">
   
    <div class="mySlides fade">
      <div class="numbertext">1 / 3</div>
      <img src="${item.pic}" />
    </div>

    <div class="mySlides fade">
      <div class="numbertext">2 / 3</div>
      <img src="${item.pic}" />
    </div>

    <div class="mySlides fade">
      <div class="numbertext">3 / 3</div>
      <img src="${item.pic}" />
    </div>

    <div style="text-align: center">
      <span class="dot" onclick="currentSlide(1)"></span>
      <span class="dot" onclick="currentSlide(2)"></span>
      <span class="dot" onclick="currentSlide(3)"></span>
    </div>
  </div>
<div class="column1">
  <div class="showName">
    <h1>${item.name}</h1>
    <i class="fa fa-heart-o" id="heart"> </i>
  </div>
  <div class="description">
    <h2>Description</h2>
    <p>
   ${item.description}
    </p>
  </div>

  <div class="containerSizeColor">
    <div class="size">
    <h3>size</h3>
    <ul id="size1">
     
    </ul>
  </div>


<div class="color">
    <h3>color</h3>
    <ul id="ulColor">
      
    </ul>
  </div>
</div>
</div>
<div class="column2">
<div class="Quantity">
<h4>Quantity</h4>
<div class="Quantity1"><span id="decreace" onclick="decrese(${item.price})">-</span> <span id="counter">1</span>  <span id="increase" onclick="increse(${item.price})">+</span></div>
</div>

<div class="priceContainer">
<div  class="price"><p>Total price</p>
    <h2 id="totalprice">$ ${item.price}.00</h2></div>
    <button class="addTocart" id="addTocart" onclick=" addToCart(${item.id})"><p> Add  </p></button>
</div>

</div>
</div>
</div>
      
        `;

  products.insertAdjacentHTML("beforeend", html);
  showSlides(slideIndex);
  getSize(item.size);
  getColor(item.color);
  // heart
  let heart = document.getElementById("heart");

  heart.addEventListener("click", () => {
    let new1 = {
      pic: item.pic,
      name: item.name,
      price: item.price,
      id: Date.now(),
      defid: item.id,
    };
    let tasksList;

    if (localStorage.getItem("heart") == null) {
      tasksList = [];
    } else {
      tasksList = JSON.parse(localStorage.getItem("heart"));
    }

    tasksList.push(new1);

    localStorage.setItem("heart", JSON.stringify(tasksList));
    heart.style.color = "red";
  });
}
//read producrt--------------------------------------------------------------------------------------------------
const queryString = window.location.search;
const urlParam = new URLSearchParams(queryString).get("id");
console.log(urlParam);
async function readProducts(id) {
  try {
    const res = await fetch(`${API_URL}/shoes/${id}`);
    const data = await res.json();
    console.log(data);
    addToDom(data);
  } catch (e) {
    console.log(e);
  }
}
readProducts(urlParam);
//function get size---------------------------------------------------------------------------------------
function getSize(array) {
  let ulSize = document.getElementById("size1");

  array.forEach((size) => {
    let span = document.createElement("span");
    span.innerText = size;
    let lisize = document.createElement("li");
    lisize.id = size;
    lisize.className = "lisize";
    lisize.append(span);
    ulSize.append(lisize);
    lisize.addEventListener("click", () => {
      document.querySelectorAll(".lisize").forEach((item) => {
        item.style.backgroundColor = "white";
      });
      if (sizeArray.length === 0) {
        sizeArray.push(lisize.id);
      } else {
        sizeArray = [];
        sizeArray.push(lisize.id);
      }
      lisize.style.backgroundColor = "black";
    });
  });
}
//function get color---------------------------------------------------------------------------------------
function getColor(array) {
  let ulColor = document.getElementById("ulColor");
  console.log(ulColor);
  if (array.length !== 0) {
    array.forEach((color) => {
      let liColor = document.createElement("li");
      liColor.id = color;
      liColor.className = "liColor";

      if (color !== "monochrome") {
        liColor.style.backgroundColor = color;
        liColor.addEventListener("click", () => {});
        ulColor.append(liColor);
        liColor.addEventListener("click", () => {
          document.querySelectorAll(".liColor").forEach((item) => {
            item.style.borderColor = "gray";
            item.style.borderWidth = "1px";
          });

          if (sizeArray.length === 0) {
            sizeColor.push(liColor.id);
          } else {
            sizeColor = [];
            sizeColor.push(liColor.id);
          }
          liColor.style.borderColor = "black";
          liColor.style.borderWidth = "5px";
        });
      } else {
        ulColor.innerText = "monochrome";
      }
    });
  } else {
    ulColor.innerText = "monochrome";
  }
}
//function add to cart and save to local storage------------------------------------------------------------
async function addToCart(id) {
  let totalprice = document
    .getElementById("totalprice")
    .innerHTML.split(" ")[1];
  let counter = document.getElementById("counter").innerHTML;

  const res = await fetch(`${API_URL}/shoes/${id}`);
  const data = await res.json();
  let letNewTask = {
    pic: data.pic,
    price: Number(totalprice),
    name: data.name,
    ipid: data.id,
    isdone: false,
    id: Date.now(),
    size: sizeArray[0],
    color: sizeColor[0],
    quantity: counter,
  };
  let tasksList;

  if (localStorage.getItem("products") == null) {
    tasksList = [];
  } else {
    tasksList = JSON.parse(localStorage.getItem("products"));
  }

  tasksList.push(letNewTask);
  localStorage.setItem("products", JSON.stringify(tasksList));

  window.location.reload();
}
//increase--------------------------------------------------------------------------------------------------------
function increse(data) {
  let counter = document.getElementById("counter");
  let totalprice = document.getElementById("totalprice");

  counter.innerHTML = " ";
  count++;
  counter.innerText = count;
  let sum = Number(data * Number(count));
  totalprice.innerHTML = " ";

  totalprice.innerHTML = `$ ${sum}`;
}
//decrease---------------------------------------------------------------------------------------------------------
function decrese(data) {
  let counter = document.getElementById("counter");
  let totalprice = document.getElementById("totalprice");

  counter.children = " ";
  count--;
  counter.innerText = count;
  let sum = Number(totalprice.innerHTML.split(" ")[1]) - data;
  totalprice.innerHTML = " ";

  totalprice.innerHTML = `$ ${sum}`;
}
// heart-------------------------------------------------------------------------------------------------------
