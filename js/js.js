"use strict"
/*
document.getElementById("boton-menu").addEventListener("click",function (){
    console.log ("funciona");
    document.querySelector(".botones").classList.toggle("mostrarMenu");

})

document.getElementById("cambiarModo").addEventListener("click",cambiarModo)
let temaActual=localStorage.getItem("tema");
let body=document.querySelector(".body");
let img= document.getElementById("modoIcono");
if (temaActual=="oscuro") {
        body.classList.add("modo-oscuro") 
}

function cambiarModo () {   
    body.classList.toggle("modo-oscuro")

    if (body.classList.contains("modo-oscuro")) {
        localStorage.setItem("tema","oscuro") 
        img.src="../imagenes/light_mode_24dp_FILL0_wght400_GRAD0_opsz24.svg" 
    }
    else {
        localStorage.setItem("tema","claro")
        img.src="../imagenes/dark_mode_24dp_FILL0_wght400_GRAD0_opsz24.svg"
    }
}




let numero1=obtenerNumeroAleatorio();
let numero2=obtenerNumeroAleatorio();
mostrarAleatorio(numero1 , numero2);

function agregar(e) {
    e.preventDefault();
    let form = document.querySelector('#form').addEventListener('submit', agregar);
    let formData= new FormData(form);
    let email =   formData.get('email');
    let nombre = formData.get('nombre');
    let mensaje=document.getElementById("mensaje");
    console.log(email, nombre,);
    let resultado= numero1 + numero2
    if (captcha(formData.get ("numero"),resultado) ) {
    mensaje.innerHTML="La validacion es correcta";
    form.reset()
    }
    else {
    mensaje.innerHTML="La suma es incorrecta. Intente nuevamente";
    }
    let numero1=obtenerNumeroAleatorio();
    let numero2=obtenerNumeroAleatorio();
    mostrarAleatorio(numero1 , numero2);
}


function captcha(numeroUsuario, numeroCorrecto ) {
    console.log(numeroUsuario, numeroCorrecto)
    if (numeroCorrecto==numeroUsuario) {
        return true
    }
    else {
        return false
    }
}

function obtenerNumeroAleatorio () {
    return Math.floor(Math.random()*10+1)  
}

function mostrarAleatorio (numero1, numero2) {
    document.querySelector("#suma").innerHTML+= numero1 + " + "  + numero2;
}

*/
const url ="https://6677a269145714a1bd7536bf.mockapi.io/api/rutina";

let id= 0;
async function obtenerDatos () {
    let tabla = document.querySelector("#tabla-ejercicios");
    tabla.innerHTML = " ";
    try {
        let res = await fetch (url);
        let json= await res.json();
        console.log(json)
        for (let rutina of json){
            let ejercicios = rutina.ejercicio;
            let series= rutina.series;
            let repeticiones= rutina.repeticiones;
            let cargas= rutina.cargas;
            let id = rutina.id;
            tabla.innerHTML += `<td class= hola>${ejercicios}</td>
                                <td>${series}</td><td>${repeticiones}</td>
                                <td>${cargas}</td>
                                <td><button data-id=${id} id= btn-editar><img src=../imagenes/editar.webp alt=btn-delete class = btn-editar></button></td>
                                <td><button data-id=${id} id= btn-eliminar><img src=../imagenes/eliminar.jpg alt=btn-delete class = btn-eliminar></button></td>`;
        }; 
        document.querySelectorAll("#btn-editar").forEach((botoneditar) =>{
            botoneditar.addEventListener("click", editarEjercicio) 
                });
            document.querySelectorAll("#btn-eliminar").forEach((botoneliminar) =>{
                botoneliminar.addEventListener("click", borrarEjercicio)     
                });
    }
    catch (error) {
        console.log(error);
    }
}

let incluir = document.querySelector("#btn-incluir");
    incluir.addEventListener("click", agregarEjercicio);
async function agregarEjercicio (e){
    e.preventDefault();
    
    let nuevoEjercicio = document.querySelector ("#texto-ejercicio").value;
    let nuevoSerie = document.querySelector ("#texto-series").value;
    let nuevoRepeticiones = document.querySelector ("#texto-repeticiones").value;
    let nuevoCargas = document.querySelector ("#texto-cargas").value;

    let rutina = {
        "ejercicio": nuevoEjercicio,
        "series": nuevoSerie,
        "repeticiones": nuevoRepeticiones,
        "cargas": nuevoCargas
    }
    try {
        let res = await fetch (url, {
            "method": "POST",
            "headers": { "Content-type": "application/json" },
            "body": JSON.stringify(rutina)
        });
        if (res.status === 201) {
            document.querySelector("#mensaje-rutina").innerHTML = "Nuevo ejercicio agregado a la tabla!";
        }
    } catch (error) {
        console.log(error);
    }
    obtenerDatos();
}

async function editarEjercicio (e){
    e.preventDefault();
    let id = this.dataset.id;
    let nuevoEjercicio = document.querySelector ("#texto-ejercicio").value;
    let nuevoSerie = document.querySelector ("#texto-series").value;
    let nuevoRepeticiones = document.querySelector ("#texto-repeticiones").value;
    let nuevoCargas = document.querySelector ("#texto-cargas").value;

    let rutina = {
        "ejercicio": nuevoEjercicio,
        "serie": nuevoSerie,
        "repeticiones": nuevoRepeticiones,
        "cargas": nuevoCargas
    }
    try {
        let res = await fetch (`${url}/${id}`, {
            "method": "PUT",
            "headers": { "Content-type": "application/json" },
            "body": JSON.stringify(rutina)
        });
        if (res.status === 200) {
            document.querySelector("#mensaje-rutina").innerHTML = "Ejercicio editado!";
        }
    } catch (error) {
        console.log(error);
    }
    obtenerDatos();
}

async function borrarEjercicio (e){
    e.preventDefault();
    let id = this.dataset.id;
    try {
        let res = await fetch (`${url}/${id}`, {
            "method": "DELETE"
        });
        if (res.status === 200) {
            document.querySelector("#mensaje-rutina").innerHTML = "Ejercicio eliminado!";
        }
    } catch (error) {
        console.log(error);
    }
    obtenerDatos();
}

obtenerDatos ();
