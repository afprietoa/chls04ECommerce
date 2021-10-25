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


const itemsPaypal = document.getElementById('itemsPaypal')
const templateCarrito = document.getElementById('templatePaypal').content
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

  let tot = JSON.parse(localStorage.getItem("totM"));
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
  

  let carrito = JSON.parse(localStorage.getItem("carritoMujer"));

  Object.values(carrito).forEach(producto => {
      templateCarrito.querySelector('.paypal__index').textContent = producto.id
      templateCarrito.querySelector('.paypal__item-name').textContent = producto.name
      templateCarrito.querySelector('.paypal__item-price').textContent =  '$' + producto.precio

      
      const clone = templateCarrito.cloneNode(true)
      fragment.appendChild(clone)
  })
  itemsPaypal.appendChild(fragment)
  
}

/*---------------------------------------------------------------------------------------------------- */
/*---------------------------------------------------------------------------------------------------- */


function startTime() {
  //declaramos las  variables que nos proporcionaran los datos como la hora, minutos etc.

  let today = new Date(),
      hours = today.getHours(),
      minutes = today.getMinutes(),
      date = today.getDate(),
      day = today.getDay(),
      month = today.getMonth();

  //utilizaremos operadores ternarios esto nos ayudara a mostrar la hora solo del 1 al 12
  hours = (hours == 0) ? 12 : hours;
  hours = (hours > 12) ? hours - 12 : hours;

  //pasaremos las horas y minutos a una funcion que crearemos mas adelante
  hours = checkTime(hours);
  minutes = checkTime(minutes);

  //primero para los dias y meses crearemos un arreglo esto por que la funcion que nos debuelve
  //los dias y meses nos los debuelbe en numero
  let dia = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      mes = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  //haora solo imprimimos los datos
    hr.textContent = hours + ":" + minutes,
      dt.textContent = dia[day] + ", " + date + " de " + mes[month];

  //esta funcion hara que nuestro escript se ejecute constantemente
  let time = setTimeout(function() {
      startTime();
  }, 500);




}
        //solo falta crear la funcion que nos diga si tine uno o dos dijitos
        //esto para que si solo tiene uno le agrege u  cero a la izquierda
        function checkTime(e) {
          if (e < 10) {
              e = "0" + e;
          }
          return e;
      }