//Referencias del DOM

const sumarBtn = document.querySelectorAll('.sumarBtn'); //añadir al carrito
const comprarBtn = document.querySelector('.comprarBtn'); //comprar
const prodCarrito = document.querySelector('.prodCarrito');

//Capturear interacción del usuario - forEach para colocar evento onclick

sumarBtn.forEach((obj) => {
  obj.addEventListener('click', sumarBtnClickeado);
});

comprarBtn.addEventListener('click', comprarBtnClickeado);

//Una vez clickeado el boton de añadir, se captura la información en variables.

function sumarBtnClickeado(e) {
  const button = e.target;
  const prod = button.closest('.prod');

  const precioProd = prod.querySelector('.precioProd').textContent;
  const tituloProd = prod.querySelector('.tituloProd').textContent;
  const imagenProd = prod.querySelector('.imagenProd').src;

  sumarAlCarrito(tituloProd, precioProd, imagenProd);
}

//Agrega los items al prodCarrito.
function sumarAlCarrito(tituloProd, precioProd, imagenProd) {
  const tuCompraSeccion = prodCarrito.getElementsByClassName('nombreProdEnCarrito');
  for (let i = 0; i < tuCompraSeccion.length; i++) {
    if (tuCompraSeccion[i].innerText === tituloProd) {
      let cantidadProds = tuCompraSeccion[
        i
      ].parentElement.parentElement.parentElement.querySelector(
        '.cantidadDeCadaProdEnCarritoNum'
      );
      cantidadProds.value++;
        //bootstrap - Cartel de incremento de producto
      $('.toast').toast('show');
      actualizarTotalCarrito();
      return;
    }
  }

  //Modifica el DOM en la sección de "tu carrito"
  const filaTuCompra = document.createElement('div');
  const contenidoCarrito = `
  <div class="row itemCarrito">
        <div class="col-8 col-md-6 col-lg-4">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <h6 class="shopping-cart-tituloProd nombreProdEnCarrito">${tituloProd}</h6>
            </div>
        </div>
        <div class="col-2 col-md-3 col-lg-4">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="precioProd mb-0 precioProdEnCarritoNum">${precioProd}</p>
            </div>
        </div>
        <div class="col-2 col-md-3 col-lg-4">
            <div
                class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input cantidadDeCadaProdEnCarritoNum" type="number"
                    value="1" min="1" max="20">
                <button class="btn btn-danger buttonDelete" type="button">X</button>
            </div>
        </div>
    </div>
    `;
  filaTuCompra.innerHTML = contenidoCarrito;
  prodCarrito.append(filaTuCompra);

  //Elimina Producto del carrito
  filaTuCompra
    .querySelector('.buttonDelete')
    .addEventListener('click', eliminarProdCarrito);

  //7. Actualizar la cantidad de cada prod
  filaTuCompra
    .querySelector('.cantidadDeCadaProdEnCarritoNum')
    .addEventListener('change', cambiarCantidad);

  actualizarTotalCarrito();

}

//Actualiza precio total del carrito
function actualizarTotalCarrito() {
  let total = 0;
  const precioFinalCarrito = document.querySelector('.precioFinalCarrito');
  const itemsCarrito = document.querySelectorAll('.itemCarrito');

  //Recorre el carrito
  itemsCarrito.forEach((itemCarrito) => {
    const precioProdEnCarrito = itemCarrito.querySelector('.precioProdEnCarritoNum');
    const precioProdEnCarritoNum = Number(precioProdEnCarrito.textContent.replace('$', ''));
    const cantidadDeCadaProdEnCarrito = itemCarrito.querySelector('.cantidadDeCadaProdEnCarritoNum');
    const cantidadDeCadaProdEnCarritoNum = Number(cantidadDeCadaProdEnCarrito.value);
    total = total + precioProdEnCarritoNum * cantidadDeCadaProdEnCarritoNum;
  });

  precioFinalCarrito.innerHTML = `${total.toFixed(2)}$`;
}

//Actualiza cantidad, eliminar prod y actualizar precio total
function eliminarProdCarrito(event) {
  const buttonClicked = event.target;
  buttonClicked.closest('.itemCarrito').remove();
  actualizarTotalCarrito();
}

function cambiarCantidad(event) {
  const input = event.target;
  input.value <= 0 ? (input.value = 1) : null;
  actualizarTotalCarrito();
}

function comprarBtnClickeado() {
  prodCarrito.innerHTML = '';
  actualizarTotalCarrito();
}