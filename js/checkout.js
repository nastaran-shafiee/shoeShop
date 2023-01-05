let array = JSON.parse(localStorage.getItem("order"));
let container = document.getElementById("containerOrder");
let sumPrice = document.getElementById("amount");
let arrayresult = [];
let totalamount = document.getElementById("totalamount");
let promoInput = document.getElementById("promoInput");
let promoBtn = document.getElementById("promoBtn");
let nameAddress = document.getElementById("nameAddress");
let defultAddresName = document.getElementById("defultAddresName");
let defultAddres = document.getElementById("defultAddres");
let chooseShiping = document.getElementById("chooseShiping");
let shipingPrice = document.getElementById("shipingPrice");
let shiping = JSON.parse(localStorage.getItem("chooseShiping"));
let cartPromo = document.getElementById("cartPromo");
let promoPrice = document.getElementById("promoPrice");
let continueBtn = document.getElementById("continueBtn");
const API_URL = "https://6396e1e077359127a0255a95.mockapi.io";

//addToDom--------------------------------------------------------------------------------------------------------------------------
function addToDom(item) {
  let html = ` <div class="containerCart">
  <div class="cartImg">
    <img src="${item.pic}" alt="" />
  </div>
  <div class="cart">
    <div class="row1">
      <p>${item.name}</p>
      <i class="fa fa-trash"></i>
    </div>
    <p>
      <span>size = </span><span>${item.size}</span> |
      <span>color</span>
      <span>${item.color}</span>
    </p>
    <div class="price">
      <p>$${item.price}.00</p>
      <div class="number">${item.quantity}</div>
    </div>
  </div>
</div>`;
  container.insertAdjacentHTML("beforeend", html);
}
//readptoducts-----------------------------------------------------------------------------------------------------------------------------------
getAddress();
readProducts(array);
function readProducts(array) {
  if (array !== null) {
    container.innerHTML = " ";
    array.forEach((element) => {
      if (element.color === undefined) {
        element.color = "monocrom";
      }
      addToDom(element);
      let sum = parseFloat(element.price);
      arrayresult.push(sum);
    });
    sum();
    shipingprice();
    arrayresult = [];
  }
}
//function sum------------------------------------------------------------------------------------------------------------------------------------
function sum() {
  if (arrayresult.length > 0) {
    arrayresult;
    let result = arrayresult
      .filter((e) => isFinite(e))
      .reduce((a, b) => parseInt(a) + parseInt(b));

    sumPrice.innerHTML = "$" + " " + result + ".00";
    totalamount.innerHTML =
      "$" + " " + (Number(result) + Number(shiping)) + ".00";
  } else {
    sumPrice.innerHTML = "$" + " " + 0 + ".00";
    totalamount.innerHTML = "$" + " " + (result + 0) + ".00";
  }
}
//function promo---------------------------------------------------------------------------------------------------------------------------
promoBtn.addEventListener("click", () => {
  let promo = Number(sumPrice.innerHTML.split(" ")[1]);
  if ((promoInput.value = 1)) {
    let result1 = promo - promo / 10;
    console.log(promo / 10);
    sumPrice.innerHTML = "$" + " " + result1 + ".00";
    totalamount.innerHTML =
      "$" + " " + (Number(result1) + Number(shiping)) + ".00";
    promoInput.style.backgroundColor = "black";
    promoInput.style.color = "White";
    promoInput.value = "Discount 10% Off";
    cartPromo.style.display = "flex";
    promoPrice.innerHTML = `- $ ${promo / 10}.00`;
  }
});
//function choose address------------------------------------------------------------------------------------------------------------------
nameAddress.addEventListener("click", () => {
  window.location.replace("/html/addres.html");
});
//function get Address---------------------------------------------------------------------------------------------------------------------
function getAddress() {
  let array = JSON.parse(localStorage.getItem("address"));
  console.log(array);
  if (array !== null) {
    defultAddresName.innerHTML = array.name;
    defultAddres.innerHTML = array.address;
  }
}
//add event listener chooseShiping-----------------------------------------------------------------------------------------------------------------
chooseShiping.addEventListener("click", () => {
  window.location.replace("/html/shopping.html");
});
function shipingprice() {
  if (localStorage.getItem("chooseShiping") == null) {
    shipingPrice.innerHTML = "please choose shiping";
  } else {
    console.log(shiping);
    let typeShiping = document.getElementById("typeShiping");

    shipingPrice.innerHTML = `$ ${Number(shiping)}.00`;
    if (shiping === "25") {
      typeShiping.innerHTML = "cargo";
    } else if (shiping === "20") {
      typeShiping.innerHTML = "Regular";
    } else if (shiping === "15") {
      typeShiping.innerHTML = "Economy";
    } else if (shiping === "30") {
      typeShiping.innerHTML = "Express";
    } else {
      typeShiping.innerHTML = "choose Shiping";
    }
  }
}
//continue btn-------------------------------------------------------------------------------------------------------------------------------------
continueBtn.addEventListener("click", () => {
  let empetyOrder = [];
  let arrayOrder = JSON.parse(localStorage.getItem("order"));
  localStorage.setItem("order", JSON.stringify(empetyOrder));
  console.log(arrayOrder);

  const newProduct = gatherFormData();
  newProduct.forEach((product) => {
    create(product);
  });
  continueBtn.style.backgroundColor = "gray";

  setTimeout(() => {
    window.location.replace("/html/payment.html");
  }, 1000);
});
//order------------------------------------------------------------------------------------------------------------------------------------------

async function create(newProduct) {
  try {
    await fetch(`${API_URL}/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newProduct),
    });
  } catch (error) {
    console.log(error);
  }
}
function gatherFormData() {
  let arrayObject = [];
  array.forEach((element) => {
    let object = {
      pic: element.pic,
      name: element.name,
      size: element.size,
      color: element.color,
      number: element.quantity,
      price: element.price,
      status: false,
    };
    arrayObject.push(object);
  });
  return arrayObject;
}
