const API_URL = "https://6396e1e077359127a0255a95.mockapi.io";
let products = document.getElementById("products");
//read products---------------------------------------------------------------------------------------------------------------------------
readProducts();
async function readProducts() {
  products.innerHTML = " ";
  try {
    const res = await fetch(`${API_URL}/shoes`);
    const data = await res.json();
    data.forEach((item) => {
      addTodom(item);
    });

    //pagination from client side
  } catch (e) {
    console.log(e);
  }
}

function addTodom(item) {
  const html = `
       
    <div class="product">
    <div class="productimg">
    <div> <i class="fa fa-trash size" onclick="getId(${item.id})"></i></div>
   
      <img
        src="${item.pic} "
        alt=""
        class="productimg"
      />
      </div>
    <div class="trash">
    <div class="name"><p class="productName">${item.name}</p>
    <p class="productPrice">$ ${item.price}.00</p></div>
    
    </div>
   
    </div>
    
      `;

  products.insertAdjacentHTML("beforeend", html);
}
//delete-----------------------------------------------------------------------------------------------------------------
function getId(id) {
  deleteProduct(id);
  readProducts();
}
async function deleteProduct(productId) {
  try {
    await fetch(`${API_URL}/shoes/${productId}`, { method: "DELETE" });
  } catch (e) {
    console.log(e.message);
  }
}
