let hr = document.querySelector(".hr");
let dt = document.querySelector(".dt");

let ownerNP = document.querySelector(".ownerNP");
let cardNP = document.querySelector(".cardNP");
let expiryDP= document.querySelector(".expiryDP");
let cvcP= document.querySelector(".cvcP");

let subTotP = document.querySelector(".cartSubtotal");
let shipP = document.querySelector(".cartShipping");
let totP = document.querySelector(".cartTotal");
let cantP = document.querySelector(".cantP");


const itemsstore = document.getElementById('itemsstore')
const templateCarrito = document.getElementById('templatestore').content
const fragment = document.createDocumentFragment()

const getLocalStorage = () => {
  let ownerName = localStorage.getItem("OwnerName");
  let cardNumber = localStorage.getItem("CardNumber");
  let expiryDate = localStorage.getItem("ExpiryDate");
  let cvc = localStorage.getItem("Cvc");

  ownerNP.textContent = ownerName;
  cardNP.textContent = cardNumber;
  expiryDP.textContent = expiryDate;
  cvcP.textContent = cvc;

  let tot = JSON.parse(localStorage.getItem("totH"));
  const { prices, shipping } = tot;
  subTotP.textContent = '$' + prices;
  shipP.textContent = '$' + shipping;
  cantP.textContent = shipping/10;
  totP.textContent = '$' + (prices + shipping);
};

document.addEventListener("DOMContentLoaded", () => {

    pintarCarrito()
    getLocalStorage()
    startTime()
});





/*---------------------------------------------------------------------------------------------------- */
/*---------------------------------------------------------------------------------------------------- */

const pintarCarrito = () => {
  

  let carrito = JSON.parse(localStorage.getItem("carritoHombre"));

  Object.values(carrito).forEach(producto => {
      templateCarrito.querySelector('.store__index').textContent = producto.id
      templateCarrito.querySelector('.store__item-name').textContent = producto.name
      templateCarrito.querySelector('.store__item-price').textContent =  '$' + producto.precio

      
      const clone = templateCarrito.cloneNode(true)
      fragment.appendChild(clone)
  })
  itemsstore.appendChild(fragment)
  
}

/*---------------------------------------------------------------------------------------------------- */
/*---------------------------------------------------------------------------------------------------- */


function startTime() {


  let today = new Date(),
      hours = today.getHours(),
      minutes = today.getMinutes(),
      date = today.getDate(),
      day = today.getDay(),
      month = today.getMonth();


  hours = (hours == 0) ? 12 : hours;
  hours = (hours > 12) ? hours - 12 : hours;


  hours = checkTime(hours);
  minutes = checkTime(minutes);

 
  let dia = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      mes = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    hr.textContent = hours + ":" + minutes,
      dt.textContent = dia[day] + ", " + date + " de " + mes[month];


  let time = setTimeout(function() {
      startTime();
  }, 500);




}

        function checkTime(e) {
          if (e < 10) {
              e = "0" + e;
          }
          return e;
      }