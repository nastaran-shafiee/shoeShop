let products = document.getElementById("products");
const API_URL = "https://6396e1e077359127a0255a95.mockapi.io";
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
function productChoose(id) {
  document.querySelector(".product").dataset.id = id;
  window.location.replace(`/html/product.html?id=${id}`);
}
