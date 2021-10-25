import { dataMen } from "../data/dataMen.js"
import { dataWomen } from "../data/dataWomen.js"

const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templatecarritoMujer = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()
let carritoMujer = {}



cards.addEventListener('click', e => { addcarritoMujer(e) });
items.addEventListener('click', e => { btnAumentarDisminuir(e) })



// Pintar productos
const pintarCards = dataWomen => {
    dataWomen.forEach(item => {
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
document.addEventListener('DOMContentLoaded', pintarCards(dataWomen) );

// Agregar al carritoMujer
const addcarritoMujer = e => {
    if (e.target.classList.contains('btn-dark')) {
        // console.log(e.target.dataset.id)
        // console.log(e.target.parentElement)
        setcarritoMujer(e.target.parentElement)

            //----------------------------------------------------------------
        
    }
    e.stopPropagation()

}

const setcarritoMujer = item => {
    // console.log(item)
    const producto = {
        name: item.querySelector('h3').textContent,
        precio: item.querySelector('span').textContent,
        id: item.querySelector('button').dataset.id,
        cantidad: 1
    }
    // console.log(producto)
    if (carritoMujer.hasOwnProperty(producto.id)) {
        producto.cantidad = carritoMujer[producto.id].cantidad + 1
    }

    carritoMujer[producto.id] = { ...producto }
    
    pintarcarritoMujer()


    
}



const pintarcarritoMujer = () => {
    items.innerHTML = ''

    Object.values(carritoMujer).forEach(producto => {
        templatecarritoMujer.querySelector('th').textContent = producto.id
        templatecarritoMujer.querySelectorAll('td')[0].textContent = producto.name
        templatecarritoMujer.querySelectorAll('td')[1].textContent = producto.cantidad
        templatecarritoMujer.querySelector('span').textContent = producto.precio * producto.cantidad
        
        //botones
        templatecarritoMujer.querySelector('.btn-info').dataset.id = producto.id
        templatecarritoMujer.querySelector('.btn-danger').dataset.id = producto.id

        const clone = templatecarritoMujer.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)

    pintarFooter()
    localStorage.setItem('carritoMujer', JSON.stringify(carritoMujer))
}

const pintarFooter = () => {
    footer.innerHTML = ''
    
    if (Object.keys(carritoMujer).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5">carritoMujer vacío</th>
        `
        return
    }
    
    // sumar cantidad y sumar totales
    const nCantidad = Object.values(carritoMujer).reduce((acc, { cantidad }) => acc + cantidad, 0)
    const nPrecio = Object.values(carritoMujer).reduce((acc, {cantidad, precio}) => acc + cantidad * precio ,0)
    // console.log(nPrecio)

    document.querySelector('.nav span').textContent = nCantidad;

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)

    footer.appendChild(fragment)

    const totM = {

        prices: nPrecio,
        shipping: nCantidad*10,
        tol: 0
    }

    localStorage.setItem("totM",JSON.stringify(totM));

    const boton = document.querySelector('#vaciar-carrito')
    boton.addEventListener('click', () => {
        carritoMujer = {}
        pintarcarritoMujer()
        document.querySelector('.nav span').textContent = 0;
    })

}

const btnAumentarDisminuir = e => {
    // console.log(e.target.classList.contains('btn-info'))
    if (e.target.classList.contains('btn-info')) {
        const producto = carritoMujer[e.target.dataset.id]
        producto.cantidad++

        document.querySelector('.nav span').textContent = producto.cantidad;

        carritoMujer[e.target.dataset.id] = { ...producto }
        pintarcarritoMujer()
    }

    if (e.target.classList.contains('btn-danger')) {
        const producto = carritoMujer[e.target.dataset.id]
        producto.cantidad--

        document.querySelector('.nav span').textContent = producto.cantidad;

        if (producto.cantidad === 0) {
            delete carritoMujer[e.target.dataset.id]
        } else {
            carritoMujer[e.target.dataset.id] = {...producto}
        }
        pintarcarritoMujer()
    }
    e.stopPropagation()
}

document.addEventListener('DOMContentLoaded', e => {

    if (localStorage.getItem('carritoMujer')) {
        carritoMujer = JSON.parse(localStorage.getItem('carritoMujer'))
        pintarcarritoMujer()
    }
    
});

//------------------------------------------------------------------

const btn8 = document.querySelector('.btn8');

btn8.addEventListener('click', ()=>{ 
    window.location.href = 'paypalWomen.html';
})


//-------------------------------------------------------------------

cards.addEventListener("click", (e) => {
    if (e.target.classList.contains("img-thumbnail")) {
      console.log(e.target.classList.contains("img-thumbnail"));
     let findId = e.target.dataset.id;
      let productWomen = dataWomen.find((pw) => pw.id == findId);
      console.log(productWomen)
     localStorage.setItem("productWomen", JSON.stringify(productWomen));
     window.location.href = "detailWomen.html";
    }
  });