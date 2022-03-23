const carrito = []

carrito.length === 0 && alert("El carrito está vacío, inicie su compra")

let carritoDeCompras = []

const contenedorTemporadas = document.getElementById('contenedor-temporadas');
const contenedorCarrito = document.getElementById('contenedor-carrito');

const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');



mostrarTemporadas(stockProductos)

function mostrarTemporadas(array){
   
    array.forEach(producto => {
        let div = document.createElement('div');
        div.classList.add('producto');
        div.innerHTML += `<div class="card">
                            <div class="card-image">
                                <img src=${producto.img}>
                                <span class="card-title">${producto.nombre}</span>
                                <a class="btn-floating halfway-fab waves-effect waves-light red" id=boton${producto.id}><i class="material-icons">add_shopping_cart</i></a>
                            </div>
                            <div class="card-content">
                                <p>${producto.desc}</p>
                                <p> $${producto.precio}</p>
                            </div>`
        contenedorTemporadas.appendChild(div);

        let boton = document.getElementById(`boton${producto.id}`)

        boton.addEventListener('click',()=>{
            agregarAlCarrito(producto.id)
            swal({
                title: "Temporada",
                text: "Añadida al carrito",
                icon: "success",
                confirm: "ok",
        
            })
        })

    });
}

   
 


function agregarAlCarrito(id) {
    let repetir = carritoDeCompras.find(produc => produc.id == id);
    if(repetir){
        repetir.cantidad++
        document.getElementById(`cantidad${repetir.id}`).innerHTML = `<p id=cantidad${repetir.id}>Cantidad:${repetir.cantidad}</p>`
        actualizarCarrito()
    }else{
      let agregarProducto = stockProductos.find(prod => prod.id == id);
    console.log(agregarProducto)
    carritoDeCompras.push(agregarProducto);
    
    agregarProducto.cantidad = 1;
    let div = document.createElement('div');
    div.classList.add('productoEnCarrito');
    div.innerHTML= `<p>${agregarProducto.nombre} </p>
                    <p> Precio: $${agregarProducto.precio}</p>
                    <p id=cantidad${agregarProducto.id}>Cantidad:${agregarProducto.cantidad}</p>
                    <button id=eliminar${agregarProducto.id} class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>`


    contenedorCarrito.appendChild(div)  
    actualizarCarrito()
    let botonEliminar = document.getElementById(`eliminar${agregarProducto.id}`)
    botonEliminar.addEventListener('click', ()=>{
        botonEliminar.parentElement.remove()
        carritoDeCompras = carritoDeCompras.filter(el => el.id != agregarProducto.id);
        actualizarCarrito();
    })  
    }
    
   

    
    
}

function actualizarCarrito(){
   contadorCarrito.innerText = carritoDeCompras.reduce((acc , el)=> acc + el.cantidad,0);
   precioTotal.innerText = carritoDeCompras.reduce((acc, el) => acc + (el.precio * el.cantidad) , 0)
}


const serietemporadas = ["uno", "dos", "tres"]
console.log(...serietemporadas)
