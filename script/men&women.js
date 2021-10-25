import { data } from "../data/data.js"

const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()
let carrito = {}



cards.addEventListener('click', e => { addCarrito(e) });
items.addEventListener('click', e => { btnAumentarDisminuir(e) })



// Pintar productos
const pintarCards = data => {
    data.forEach(item => {
        const {name, precio, id, image} = item;
        templateCard.querySelector('h3').textContent = name
        templateCard.querySelector('h4 span').textContent = precio
  

        templateCard.querySelector(".img-thumbnail").dataset.id = id;
        templateCard.querySelector('button').dataset.id = id
        templateCard.querySelector('img').setAttribute('src', image)
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    cards.appendChild(fragment)
}

// Eventos
// El evento DOMContentLoaded es disparado cuando el documento HTML ha sido completamente cargado y parseado
// Agregar al carrito

document.addEventListener('DOMContentLoaded', pintarCards(data) );


const addCarrito = e => {
    if (e.target.classList.contains('btn-dark')) {

        setCarrito(e.target.parentElement)
        
    }
    e.stopPropagation()

}

const setCarrito = item => {   
    const producto = {
        name: item.querySelector('h3').textContent,
        precio: item.querySelector('span').textContent,
        id: item.querySelector('button').dataset.id,
        cantidad: 1
    }
    
    if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1
    }

    carrito[producto.id] = { ...producto }
    
    pintarCarrito()    
}

//botones

const pintarCarrito = () => {
    items.innerHTML = ''

    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.name
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('span').textContent = producto.precio * producto.cantidad
        
        
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id

        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)
    
    pintarFooter()
    localStorage.setItem('carrito', JSON.stringify(carrito))
}
// sumar cantidad y sumar totales

const pintarFooter = () => {
    footer.innerHTML = ''
    
    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío</th>
        `
        return
    }
    
    const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio ,0)

    document.querySelector('.nav span').textContent = nCantidad;

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)

    footer.appendChild(fragment)

    const tot = {

        prices: nPrecio,
        shipping: nCantidad*10,
        tol: 0
    }

    localStorage.setItem("tot",JSON.stringify(tot));

    const boton = document.querySelector('#vaciar-carrito')
    boton.addEventListener('click', () => {
        carrito = {}
        pintarCarrito()
        document.querySelector('.nav span').textContent = 0;
        
    })

}

const btnAumentarDisminuir = e => {
    
    if (e.target.classList.contains('btn-info')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++

        document.querySelector('.nav span').textContent = producto.cantidad;

        carrito[e.target.dataset.id] = { ...producto }
        pintarCarrito()
    }

    if (e.target.classList.contains('btn-danger')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--

        document.querySelector('.nav span').textContent = producto.cantidad;

        if (producto.cantidad === 0) {
            delete carrito[e.target.dataset.id]
        } else {
            carrito[e.target.dataset.id] = {...producto}
        }
        pintarCarrito()
    }
    e.stopPropagation()
}

document.addEventListener('DOMContentLoaded', e => {

    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        pintarCarrito()
    }
    
});

//------------------------------------------------------------------

const btn8 = document.querySelector('.btn8');

btn8.addEventListener('click', ()=>{ 
    window.location.href = 'paypal.html';
})


//-------------------------------------------------------------------

cards.addEventListener("click", (e) => {
    if (e.target.classList.contains("img-thumbnail")) {
      console.log(e.target.classList.contains("img-thumbnail"));
     let findId = e.target.dataset.id;
      let product = data.find((p) => p.id == findId);
      console.log(product)
     localStorage.setItem("product", JSON.stringify(product));
     window.location.href = "detail.html";
    }
  });