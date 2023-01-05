let file = document.getElementById("file");
let showName = document.getElementById("showName");
let category1 = document.getElementById("category");
let price1 = document.getElementById("price");
let form1 = document.getElementById("form1");
let description1 = document.getElementById("description");
const API_URL = "https://6396e1e077359127a0255a95.mockapi.io";
let containerTodo = document.getElementById("containerTodo");
let arraySize = [];
let arrayColor = [];
let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");
//create product---------------------------------------------------------------------------------------------------------------------------
form1.addEventListener("submit", (e) => {
  console.log("object");
  let inputElementsSize = document.querySelectorAll(".checkSize");
  let inputElementsColor = document.querySelectorAll(".checkColor");

  e.preventDefault();
  inputElementsSize.forEach((item) => {
    if (item.checked) {
      arraySize.push(item.value);
    }
  });
  inputElementsColor.forEach((item) => {
    if (item.checked) {
      arrayColor.push(item.value);
    }
  });

  const newProduct = gatherFormData(e);

  create(newProduct);
});

async function create(newProduct) {
  try {
    await fetch(`${API_URL}/shoes`, {
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
function gatherFormData(e) {
  const {
    pic,
    name,
    category,
    price,
    creatAt,
    isDone,
    description,
    size,
    color,
  } = e.target;
  return {
    pic: file.value,
    name: showName.value,
    category: change1(),
    price: price1.value,
    creatAt: new Date(),
    isDone: false,
    description: description1.value,
    size: arraySize,
    color: arrayColor,
  };
}

function change1() {
  return category1.value;
}

//edit
