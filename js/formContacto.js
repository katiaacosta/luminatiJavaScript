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
    // limpio el localStorage
    // localStorage.clear();
}



//<------ muestro respuesta en contantanos.html luego de enviar el form ----->

//loader
const getData = () => {
    let loader = document.getElementById('loader');
    respuesta.innerHTML = '';
    loader.className = 'loader-show';
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            loader.className = 'loader-hide';
            resolve(respuesta)
        }, 3000)
    })        
}

let respuesta = document.getElementById("respuesta");
respuesta.addEventListener("submit", enviarForm)

function enviarForm(e){ 
    getData().then(response => {   
        //fetch-----------------
        const data = {
            //elijo que quiero mostrar
            tittle: email,
            body: nombre,telefono,mensaje,
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

        //modifico el DOM----------------------
        e.preventDefault();    
        respuesta.innerHTML = "";
        let div = document.createElement("div");
        div.innerHTML = `
    
        <h1>Mensaje Enviado</h1>
        <br>
        <p>Perfecto ${nombre}, recibimos tu mensaje "${mensaje}" nos estaremos contactando a la brevedad al mail ${email} o por whatsapp al ${telefono}
        </p>
        `;
        respuesta.appendChild(div);
        agregarDatosForm();
    })
}