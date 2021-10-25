import { dataMen } from "../data/dataMen.js"

const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templatecarritoHombre = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()
let carritoHombre = {}



cards.addEventListener('click', e => { addcarritoHombre(e) });
items.addEventListener('click', e => { btnAumentarDisminuir(e) })



// Pintar productos
const pintarCards = dataMen => {
    dataMen.forEach(item => {
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
document.addEventListener('DOMContentLoaded', pintarCards(dataMen) );

// Agregar al carritoHombre
const addcarritoHombre = e => {
    if (e.target.classList.contains('btn-dark')) {
        // console.log(e.target.dataset.id)
        // console.log(e.target.parentElement)
        setcarritoHombre(e.target.parentElement)

            //----------------------------------------------------------------
        
    }
    e.stopPropagation()

}

const setcarritoHombre = item => {
    // console.log(item)
    const producto = {
        name: item.querySelector('h3').textContent,
        precio: item.querySelector('span').textContent,
        id: item.querySelector('button').dataset.id,
        cantidad: 1
    }
    // console.log(producto)
    if (carritoHombre.hasOwnProperty(producto.id)) {
        producto.cantidad = carritoHombre[producto.id].cantidad + 1
    }

    carritoHombre[producto.id] = { ...producto }
    
    pintarcarritoHombre()


    
}



const pintarcarritoHombre = () => {
    items.innerHTML = ''

    Object.values(carritoHombre).forEach(producto => {
        templatecarritoHombre.querySelector('th').textContent = producto.id
        templatecarritoHombre.querySelectorAll('td')[0].textContent = producto.name
        templatecarritoHombre.querySelectorAll('td')[1].textContent = producto.cantidad
        templatecarritoHombre.querySelector('span').textContent = producto.precio * producto.cantidad
        
        //botones
        templatecarritoHombre.querySelector('.btn-info').dataset.id = producto.id
        templatecarritoHombre.querySelector('.btn-danger').dataset.id = producto.id

        const clone = templatecarritoHombre.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)

    pintarFooter()
    localStorage.setItem('carritoHombre', JSON.stringify(carritoHombre))
}

const pintarFooter = () => {
    footer.innerHTML = ''
    
    if (Object.keys(carritoHombre).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5">carritoHombre vacío</th>
        `
        return
    }
    
    // sumar cantidad y sumar totales
    const nCantidad = Object.values(carritoHombre).reduce((acc, { cantidad }) => acc + cantidad, 0)
    const nPrecio = Object.values(carritoHombre).reduce((acc, {cantidad, precio}) => acc + cantidad * precio ,0)
    // console.log(nPrecio)

    document.querySelector('.nav span').textContent = nCantidad;

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)

    footer.appendChild(fragment)

    const totH = {

        prices: nPrecio,
        shipping: nCantidad*10,
        tol: 0
    }

    localStorage.setItem("totH",JSON.stringify(totH));

    const boton = document.querySelector('#vaciar-carrito')
    boton.addEventListener('click', () => {
        carritoHombre = {}
        pintarcarritoHombre()
        document.querySelector('.nav span').textContent = 0;
    })

}

const btnAumentarDisminuir = e => {
    // console.log(e.target.classList.contains('btn-info'))
    if (e.target.classList.contains('btn-info')) {
        const producto = carritoHombre[e.target.dataset.id]
        producto.cantidad++

        document.querySelector('.nav span').textContent = producto.cantidad;

        carritoHombre[e.target.dataset.id] = { ...producto }
        pintarcarritoHombre()
    }

    if (e.target.classList.contains('btn-danger')) {
        const producto = carritoHombre[e.target.dataset.id]
        producto.cantidad--

        document.querySelector('.nav span').textContent = producto.cantidad;

        if (producto.cantidad === 0) {
            delete carritoHombre[e.target.dataset.id]
        } else {
            carritoHombre[e.target.dataset.id] = {...producto}
        }
        pintarcarritoHombre()
    }
    e.stopPropagation()
}

document.addEventListener('DOMContentLoaded', e => {

    if (localStorage.getItem('carritoHombre')) {
        carritoHombre = JSON.parse(localStorage.getItem('carritoHombre'))
        pintarcarritoHombre()
    }
    
});

//------------------------------------------------------------------

const btn8 = document.querySelector('.btn8');

btn8.addEventListener('click', ()=>{ 
    window.location.href = 'paypalMen.html';
})


//-------------------------------------------------------------------

cards.addEventListener("click", (e) => {
    if (e.target.classList.contains("img-thumbnail")) {
      console.log(e.target.classList.contains("img-thumbnail"));
     let findId = e.target.dataset.id;
      let productMen = dataMen.find((pm) => pm.id == findId);
      console.log(productMen)
     localStorage.setItem("productMen", JSON.stringify(productMen));
     window.location.href = "detailMen.html";
    }
  });