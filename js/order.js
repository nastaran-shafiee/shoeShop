let containerActive = document.getElementById("containerActive");
let containercompleted = document.getElementById("containercompleted");
let Active = document.getElementById("Active");
let completed = document.getElementById("completed");
const API_URL = "https://6396e1e077359127a0255a95.mockapi.io";
let container = document.getElementById("containerBody");

readProducts(false, " in delevery", "Track Order");

//addevent listener Active-------------------------------------------------------------------------------------------------------------------------
Active.addEventListener("click", () => {
  Active.classList.add("black");
  containerActive.classList.add("blackBorder");
  completed.classList.remove("black");
  containercompleted.classList.remove("blackBorder");
  container.innerHTML = " ";
  readProducts(false, " in delevery", "Track Order");
});
//addevent listener completed---------------------------------------------------------------------------------------------------------------------
completed.addEventListener("click", () => {
  completed.classList.add("black");
  containercompleted.classList.add("blackBorder");
  Active.classList.remove("black");
  containerActive.classList.remove("blackBorder");
  container.innerHTML = " ";

  readProducts(true, "completed", "buy Again");
});

async function readProducts(status, text, text2) {
  try {
    const res = await fetch(`${API_URL}/order`);
    const data = await res.json();
    if (data.length > 0) {
      data.forEach((item) => {
        if (item.status === status) {
          addTodom(item, text, text2);
        }
      });
    } else {
      addToDom2();
    }

    //pagination from client side
  } catch (e) {
    console.log(e);
  }
}

function addTodom(item, text, text2) {
  const html = `
       
  <div class="containerCart">
  <div class="cartImg">
 <img src="${item.pic}" alt="" />
</div>
<div class="cart">
 <div class="row1">
   <p>${item.name}</p>
 
 </div>
 <p>
   <span>size = </span><span>${item.size}</span> | <span>color</span>
   <span>${item.color}</span>
 </p>
 <div class="delivery"><p>${text}</p></div>
 <div class="price">
   <p id="totalprice">$ ${item.price}.00</p>
   <div class="trackOrder" id="trackOrder"> ${text2}</div>
 </div>
</div>
</div>
    </div>
    
      `;

  container.insertAdjacentHTML("beforeend", html);
}
function addToDom2() {
  container.innerHTML = " ";
  let html = ` <div class="notFound" id="notFound">
      <div>
        <img src="/Assest/images/notFound.PNG" alt="" />
      </div>
      <p>you dont have order yet</p>
     
    </div>`;
  container.insertAdjacentHTML("afterbegin", html);
}
