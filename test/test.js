function someFunc(arg) {
  alert(arg.foo);
  alert(arg.bar);
}

liColor.addEventListener("click", () => {
  document.querySelectorAll(".liColor").forEach((item) => {
    item.style.backgroundColor = "white";
  });
  if (sizeArray.length === 0) {
    sizeColor.push(liColor.id);
  } else {
    sizeColor = [];
    sizeColor.push(liColor.id);
  }
  lisize.style.backgroundColor = "black";
});
