
let subTotP = document.querySelector(".subTot-p");
let shipP = document.querySelector(".ship-p");
let totP = document.querySelector(".tot-p");
let btn = document.querySelector(".btn");

const getLocalStorage = () => {
  let tot = JSON.parse(localStorage.getItem("tot"));
  const { prices, shipping, tol } = tot;
  subTotP.textContent = '$' + prices;
  shipP.textContent = '$' + shipping;
  totP.textContent = '$' + (prices + shipping);
};

document.addEventListener("DOMContentLoaded", getLocalStorage);

btn.addEventListener("click", () => {
    capturarDatos();
  window.location.href = "eBillOfSale.html";
});





/*---------------------------------------------------------------------------------------------------- */
/*---------------------------------------------------------------------------------------------------- */

function capturarDatos(){
    let ownerName = document.querySelector('#ownerName').value; 
    let cardNumber = document.querySelector('#cardNumber').value; 
    let expiryDate = document.querySelector('#expiryDate').value; 
    let cvc = document.querySelector('#cvc').value; 

    guardarLocalStorage(ownerName,cardNumber,expiryDate,cvc)
}
function guardarLocalStorage(ownerName,cardNumber,expiryDate,cvc) {
    localStorage.setItem('OwnerName', ownerName)
    localStorage.setItem('CardNumber', cardNumber)
    localStorage.setItem('ExpiryDate', expiryDate)
    localStorage.setItem('Cvc', cvc)
}

