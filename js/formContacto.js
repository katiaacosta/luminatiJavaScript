//tomo datos de entrada del form

let inputemail = document.getElementById("email");
let inputtelefono = document.getElementById("telefono");
let inputmensaje = document.getElementById("mensaje");
let inputnombre = document.getElementById("nombre");

//obtengo el valor de los datos de entrada del form
let email = inputemail.addEventListener('change',() => {
    email = inputemail.value;
});

let telefono = inputtelefono.addEventListener('change',() => {
    telefono = inputtelefono.value;
});

let mensaje = inputmensaje.addEventListener('change',() => {
    mensaje = inputmensaje.value;
});

let nombre = inputnombre.addEventListener('change',() => {
    nombre = inputnombre.value;
});

//creo objeto con los datos obtenidos
function agregarDatosForm(){
    const formulario = {
        outputemail : email,
        outputtelefono : telefono,
        outputmensaje : mensaje,
        outputnombre : nombre,
    }
    //convierto objeto a JSON
    const salida = JSON.stringify(formulario);
    //guardo el objeto en localStorage
    localStorage.setItem("comentario",salida)
    //imprimo objeto en la consola
    console.log(formulario);    
    // localStorage.clear();
}

//muestro respuesta en contantanos.html luego de enviar el form.
let respuesta = document.getElementById("respuesta");
let div;
respuesta.addEventListener("submit", enviarForm)

function enviarForm(e){    
    e.preventDefault();    
    respuesta.innerHTML = "";
    div = document.createElement("div");
    div.innerHTML = `

    <h1>Mensaje Enviado</h1>
    <br>
    <p>Perfecto ${nombre}, recibimos tu mensaje "${mensaje}" nos estaremos contactando a la brevedad al mail ${email} o por whatsapp al ${telefono}
    </p>
    `;
    respuesta.appendChild(div);
    agregarDatosForm();
}



