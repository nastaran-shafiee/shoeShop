let Applybtn = document.getElementById("Applybtn");
let check = document.querySelectorAll(".check");
//applt btn----------------------------------------------------------------------------------------------------------------------------------------
Applybtn.addEventListener("click", () => {
  console.log(check);
  check.forEach((item) => {
    if (item.checked == true) {
      let spanParent = item.nextElementSibling;

      let spanText = spanParent.firstElementChild.innerHTML;
      localStorage.setItem("chooseShiping", JSON.stringify(spanText));
      window.location.replace("/html/checkoutt.html");
    }
  });
});
