let array = JSON.parse(localStorage.getItem("heart"));
console.log(array);
let products = document.getElementById("products");
//read products---------------------------------------------------------------------------------------------------------------------------
readProducts(array);
function readProducts(array) {
  products.innerHTML = " ";
  array.forEach((element) => {
    addTodom(element);
    console.log(element);
  });
}

function addTodom(item) {
  const html = `
    <div class="product" >
    <div class="productimg" >
    <div onclick="getId(${item.id})"> <i class="fa fa-trash size" ></i></div>
   
      <img
        src="${item.pic} "
        alt=""
        class="productimg"
      />
      </div>
    <div class="trash">
    <div class="name" onclick="productChoose(${item.defid})"><p class="productName">${item.name}</p>
    <p class="productPrice">$ ${item.price}.00</p></div>
    
    </div>
   
    </div>
    
      `;

  products.insertAdjacentHTML("afterbegin", html);
}
//delete-----------------------------------------------------------------------------------------------------------------
function getId(id) {
  console.log(id);
  let remove = JSON.parse(localStorage.getItem("heart"));
  let array2 = [];
  remove.forEach((e) => {
    if (e.id !== id) {
      array2.push(e);
    }
  });
  console.log(array2);
  localStorage.setItem("heart", JSON.stringify(array2));
  readProducts(array2);
}
function productChoose(id) {
  document.querySelector(".product").dataset.id = id;
  window.location.replace(`/html/product.html?id=${id}`);
}
