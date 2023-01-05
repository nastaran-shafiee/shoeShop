const API_URL = "https://6396e1e077359127a0255a95.mockapi.io";
let products = document.getElementById("products");

let containerActive = document.getElementById("containerActive");
let containercompleted = document.getElementById("containercompleted");
let Active = document.getElementById("Active");
let completed = document.getElementById("completed");
Active.classList.add("black");
containerActive.classList.add("blackBorder");
//addevent listener Active-------------------------------------------------------------------------------------------------------------------------
Active.addEventListener("click", () => {
  Active.classList.add("black");
  containerActive.classList.add("blackBorder");
  completed.classList.remove("black");
  containercompleted.classList.remove("blackBorder");
  products.innerHTML = " ";
  readProducts(false, "accept");
});
//addevent listener completed---------------------------------------------------------------------------------------------------------------------
completed.addEventListener("click", () => {
  completed.classList.add("black");
  containercompleted.classList.add("blackBorder");
  Active.classList.remove("black");
  containerActive.classList.remove("blackBorder");
  products.innerHTML = " ";

  readProducts(true, " deliverd");
});
//read products---------------------------------------------------------------------------------------------------------------------------
readProducts(false, " deliverd");
async function readProducts(status, text) {
  products.innerHTML = " ";
  try {
    const res = await fetch(`${API_URL}/order`);
    const data = await res.json();
    data.forEach((item) => {
      if (item.status === status) {
        addTodom(item, text);
      }
    });

    //pagination from client side
  } catch (e) {
    console.log(e);
  }
}

function addTodom(item, text) {
  const html = `
       
    <div class="product">
 
    <div class="productimg">
   
      <img
        src="${item.pic} "
        alt=""
        class="productimg"
      />
      </div>
    <div class="trash">
    <div class="name"><p class="productName">${item.name}</p>
    <p class="productPrice">$ ${item.price}.00</p></div>
   <div class=containerAccept>
  
   <div class="accept" id="accept" onclick="accept(${item.id})">${text}</div>
   </div>
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
//accept function----------------------------------------------------------------------------------------------------------------
function accept(id) {
  let accept = document.getElementById("accept");
  updateProduct(id);
  accept.innerHTML = "Deleverd";
}
function gatherEditFormData() {
  return {
    status: true,
  };
}
async function updateProduct(id) {
  let updatedProduct1 = gatherEditFormData();
  try {
    const res = await fetch(`${API_URL}/order/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedProduct1),
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.log(error.message);
  }
}
