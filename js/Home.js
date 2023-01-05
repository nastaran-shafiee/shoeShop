let products = document.getElementById("products");
let All = document.getElementById("All");
let Nike = document.getElementById("Nike");
let Asics = document.getElementById("Asics");
let Puma = document.getElementById("Puma");
let Rebook = document.getElementById("Rebook");
let NewBrand = document.getElementById("NewBrand");
let Converse = document.getElementById("Converse");
let more = document.getElementById("more");
let Addidas = document.getElementById("Addidas");
let searchBtn = document.getElementById("searchBtn");
let notFound = document.getElementById("notFound");
// brands addeventlistener-------------------------------------------------------------------------------------------------------------------
Nike.addEventListener("click", function () {
  readProduct("Nike");
});
Asics.addEventListener("click", function () {
  readProduct("Asics");
});
Puma.addEventListener("click", function () {
  readProduct("Puma");
});
Rebook.addEventListener("click", function () {
  readProduct("Reebok");
});
NewBrand.addEventListener("click", function () {
  readProduct("New brand");
});
Converse.addEventListener("click", function () {
  readProduct("converse");
});
All.addEventListener("click", function () {
  readProducts();
});
more.addEventListener("click", function () {
  readProduct("more");
});
Addidas.addEventListener("click", function () {
  readProduct("Adidas");
});
// read products--------------------------------------------------------------------------------------------------------------------------------
const API_URL = "https://6396e1e077359127a0255a95.mockapi.io";
async function readProducts(page = 1) {
  products.innerHTML = " ";

  try {
    const res = await fetch(`${API_URL}/shoes`);
    const data = await res.json();
    console.log(data);

    data.forEach(addToDom);
  } catch (e) {
    console.log(e);
  }
}
// add to dom-----------------------------------------------------------------------------------------------------------------------------------

function addToDom(item) {
  const html = `
       
    <div class="product" onclick="productChoose(${item.id})">
    <div class="productimg">
      <img
        src="${item.pic} "
        alt=""
        class="productimg"
      />
    </div>
    <p class="productName">${item.name}</p>
    <p class="productPrice">$ ${item.price}.00</p>
    </div>
    
      `;

  products.insertAdjacentHTML("beforeend", html);
}

readProducts();
// read product--------------------------------------------------------------------------------------------------------------------
async function readProduct(category) {
  products.innerHTML = " ";
  try {
    const res = await fetch(`${API_URL}/shoes`);
    const data = await res.json();
    data.forEach((item) => {
      if (item.category === category) {
        addToDom(item);
      }
    });
  } catch (e) {
    console.log(e);
  }
}

function productChoose(id) {
  document.querySelector(".product").dataset.id = id;
  window.location.replace(`/html/product.html?id=${id}`);
}

//function search----------------------------------------------------------------------------------------------------------------------------------
searchBtn.addEventListener("search", () => {
  searchFunction();
});
async function searchFunction() {
  products.innerHTML = " ";
  let blog = searchBtn.value;
  try {
    const res = await fetch(`${API_URL}/shoes?filter=${blog}`);
    const data = await res.json();
    if (data.length > 0) {
      data.forEach((e) => {
        addToDom(e);
      });
    } else {
      products.innerHTML = " ";
      let html = ` <div class="notFound" id="notFound">
      <div>
        <img src="/Assest/images/notFound.PNG" alt="" />
      </div>
      <h2>Not found</h2>
      <p>
        sorry, the keyword you entered cannot be found.please check again or
        search with another keyword
      </p>
    </div>`;
      products.insertAdjacentHTML("afterbegin", html);
    }
  } catch (e) {
    console.log(e);
  }
}
// move btn button--------------------------------------------------------------------------------------------------------------------
const slider = document.querySelector(".brandsBtn");
let mouseDown = false;
let startX, scrollLeft;

let startDragging = function (e) {
  mouseDown = true;
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
};
let stopDragging = function (event) {
  mouseDown = false;
};

slider.addEventListener("mousemove", (e) => {
  e.preventDefault();
  if (!mouseDown) {
    return;
  }
  const x = e.pageX - slider.offsetLeft;
  const scroll = x - startX;
  slider.scrollLeft = scrollLeft - scroll;
});

// Add the event listeners
slider.addEventListener("mousedown", startDragging, false);
slider.addEventListener("mouseup", stopDragging, false);
slider.addEventListener("mouseleave", stopDragging, false);
