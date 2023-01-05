let email = document.getElementById("email");
let pass = document.getElementById("pass");
let form1 = document.getElementById("form1");
let check = document.getElementById("check");
form1.addEventListener("submit", (e) => {
  tasksList = {
    email: email.value,
    pass: pass.value,
  };
  e.preventDefault();
  if (check.checked == true) {
    localStorage.setItem("user", JSON.stringify(tasksList));
    window.location.replace("/html/Home.html");
  } else {
    window.location.replace("/html/Home.html");
  }
});
