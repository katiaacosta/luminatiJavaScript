//Referencias del DOM

const sumarBtn = document.querySelectorAll('.sumarBtn'); //añadir al carrito
const comprarBtn = document.querySelector('.comprarBtn'); //comprar
const prodCarrito = document.querySelector('.prodCarrito');
const formCompra = document.getElementById('formCompra'); 
const enviarBtn = document.getElementById('enviar');
let respuesta; //luego de comprar, muestra form para llenar datos y luego muestra mensaje de exito.

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

  //Muestro item Agregado al carrito con Toastify
  Toastify({
    text: tituloProd + ' agregado exitosamente',
    duration: 1000,
    gravity: 'top',
    position: 'center',
    className: 'itemAgregado'
  }).showToast();

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
  const itemsCarrito = document.querySelectorAll('.itemCarrito'); // itemCarrito

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
  // prodCarrito.innerHTML = '';
  actualizarTotalCarrito();
  formCompra.innerHTML = '';

  //Modifica el DOM en la sección de "tu carrito", una vez que compra
  let divForm = document.createElement('div');
  const formCarrito = `
  <section class="bloque">
      <div id="respuesta" class="col-12 col-md-8 col-lg-8 borde">
          <h1>Completa tus datos</h1>
          <br>
          <form> 
              <p class="contacto-tamanio">
                  <label for="correo">Email:</label>
                  <br>
                  <input id="email" type="email" name="correo"> 
              </p>
              <p class="contacto-tamanio">
                  <label for="name">Nombre:</label>
                  <br>
                  <input id="nombre" type="text" name="name"> 
              </p>                   
              <p class="contacto-tamanio">
                  <label for="telefono">Telefono:</label>
                  <br>
                  <input id="telefono" type="text" name="telefono">  
              </p> 
              <p class="contacto-tamanio">
                  <label for="provincia">Provincia:</label>
                  <br>
                  <input id="provincia" type="text" name="provincia">  
              </p> 
              <p class="contacto-tamanio">
                  <label for="localidad">Localidad:</label>
                  <br>
                  <input id="localidad" type="text" name="localidad">  
              </p> 
              <p class="contacto-tamanio">
                  <label for="Direccion">Direccion:</label>
                  <br>
                  <input id="direccion" type="text" name="direccion">  
              </p>  
              <p class="contacto-tamanio">   
                <label class="my-1 mr-2" for="inlineFormCustomSelectPref">Forma de pago:</label>
                <select class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref">
                  <option selected>Seleccione...</option>
                  <option value="Efectivo">Efectivo</option>
                  <option value="Transferencia">Transferencia</option>
                </select>
              </p>             
              <p class="contacto-tamanio">
                  <label for="comentarios">Dejanos un comentario adicional:</label> 
                  <br>
                  <textarea id="mensaje" name="mensaje" rows="4" cols="25"></textarea>
              </p>
              <br>  
              <input type="submit" value="Finalizar Compra">
              <input type="reset" value="Cancelar">                  
          </form>    
      </div>
  </section>  
    `;
  divForm.innerHTML = formCarrito;
  formCompra.append(divForm);
  
  
  //Fetch---------------------

  respuesta = document.getElementById("respuesta");
  respuesta.addEventListener("submit", finalizoCompra)

}

function finalizoCompra(e){
  e.preventDefault();
  let email = document.getElementById('email').value;
  let nombre = document.getElementById('nombre').value;
  let telefono = document.getElementById('telefono').value;
  let provincia = document.getElementById('provincia').value;
  let localidad = document.getElementById('localidad').value;
  let direccion = document.getElementById('direccion').value;
  let pago = document.getElementById('inlineFormCustomSelectPref').value;
  let mensaje = document.getElementById('mensaje').value;
  const data = {
    //elijo que quiero mostrar
    tittle: email,
    body: nombre, telefono, provincia, localidad, direccion, pago, mensaje,
  }
  //configuro el fetch
  fetch('https://jsonplaceholder.typicode.com/posts',{
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    }
  })
  .then((response) => response.json())
  .then((data) =>{
    console.log(data)
  })

  respuesta.innerHTML= '';
  let div = document.createElement("div");
        div.innerHTML = `
          <p>Perfecto ${nombre}, recibimos tu compra! Nos estaremos contactando a la brevedad al mail ${email} o por whatsapp al ${telefono}.</p>
        `;
  respuesta.appendChild(div);


  //----------fin fetch

}

