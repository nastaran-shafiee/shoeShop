let add = document.getElementById("add");
let containerAdd = document.getElementById("containerAdd");
const API_URL = "https://6396e1e077359127a0255a95.mockapi.io";
let inputName = document.getElementById("inputName");
let inputAddress = document.getElementById("inputAddress");
let addBtn = document.getElementById("addBtn");
let containerAddress = document.getElementById("containerAddress");
let Applybtn = document.getElementById("Applybtn");
//addeventlistener add btn---------------------------------------------------------------------------------------------------------------------
add.addEventListener("click", () => {
  containerAdd.classList.toggle("displayFlex");
});

//function add to api-------------------------------------------------------------------------------------------------------------------------
addBtn.addEventListener("click", () => {
  const newProduct = gatherFormData();
  create(newProduct);
});
// function create------------------------------------------------------------------------------------------------------------------------------
async function create(newProduct) {
  try {
    await fetch(`${API_URL}/shoes/1/address`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    containerAddress.innerHTML = " ";
    readProduct();
  } catch (error) {
    console.log(error);
  }
}
function gatherFormData() {
  return {
    name: inputName.value,
    address: inputAddress.value,
  };
}
// function read---------------------------------------------------------------------------------------------------------------------------------
readProduct();
async function readProduct() {
  try {
    const res = await fetch(`${API_URL}/shoes/1/address`);
    const data = await res.json();
    data.forEach((element) => {
      addToDom(element);
    });
  } catch (e) {
    console.log(e);
  }
}
function addToDom(item) {
  let html = `  <div class="address">
  <div class="addressCart" id="addressCart">
    <div class="location">
      <p>
        <span class="material-symbols-outlined"> location_on </span>
      </p>
    </div>
    <div class="nameAddress">
      <p class="name" id="name">${item.name}</p>
      <p class="addressdes">
       ${item.address}
      </p>
    </div>
    <div class="edit" id="nameAddress" id="edit">
      <input type="radio" name="check" id="${item.id}" class="check" />
      <span class="material-symbols-outlined" onclick="getId(${item.id})">
delete
</span>

    </div>
  </div>
</div>`;
  containerAddress.insertAdjacentHTML("beforeend", html);
}
//delete-------------------------------------------------------------------------------------------------------------------------------------
function getId(id) {
  deleteProduct(id);
  containerAddress.innerHTML = " ";
}
async function deleteProduct(productId) {
  try {
    await fetch(`${API_URL}/shoes/1/address/${productId}`, {
      method: "DELETE",
    });
    readProduct();
  } catch (e) {
    console.log(e.message);
  }
}
//apply btn-----------------------------------------------------------------------------------------------------------------------------------
Applybtn.addEventListener("click", () => {
  let tasksList = [];
  let checkbox = document.querySelectorAll(".check");
  checkbox.forEach((item) => {
    if (item.checked == true) {
      let defultAddress = readAddress(item.id);
      defultAddress.then(function (result) {
        localStorage.setItem("address", JSON.stringify(result));
        window.location.replace("/html/checkoutt.html");
      });
    }
  });
});

async function readAddress(id) {
  try {
    const res = await fetch(`${API_URL}/shoes/1/address/${id}`);
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}
