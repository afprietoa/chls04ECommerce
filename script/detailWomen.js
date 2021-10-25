let h3 = document.querySelector("h3");
let h2 = document.querySelector("h2 span");
let img = document.querySelector("img");
let btn = document.querySelector(".btn-dark");

const getLocalStorage = () => {
  let detalle = JSON.parse(localStorage.getItem("productWomen"));
  const { name, precio, image } = detalle;
  h3.textContent = name;
  h2.textContent = precio;
  img.setAttribute("src", image);
};

document.addEventListener("DOMContentLoaded", getLocalStorage);

btn.addEventListener("click", () => {
  window.location.href = "women.html";
});