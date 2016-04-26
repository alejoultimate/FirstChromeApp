

function func1() {
  document.querySelector('#greeting').innerText =
    'Hello, World! It is ' + new Date() + ' ..... esto va muy bien';
}


function myFunction() {
    console.log("Hello! I am an alert box!");
}

function conectarPuerto() {
    var rutaPuertoActual = document.getElementById("listaDePuertos").value;
    var puerto = new Puerto( rutaPuertoActual );
    //puerto.escucharPuerto();
    puerto.abrirPuerto();
    document.getElementById('txtEstadoConexion').innerHTML = "Puerto conectado";
}

function escucharPuerto() {
    var rutaPuertoActual = document.getElementById("listaDePuertos").value;
    var puerto = new Puerto( rutaPuertoActual );
    puerto.escucharPuerto();
    document.getElementById('txtEscuchando').innerHTML = "Escuchando";
}


/* Permite cargar múltiples funciones de JavaScript en el evento onload */
function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      if (oldonload) {
        oldonload();
        func();
      }
    };
  }
}


addLoadEvent(func1);
addLoadEvent(myFunction);
addLoadEvent(escucharPuerto);


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('conectarButton').addEventListener('click', conectarPuerto);
    document.getElementById('escucharButton').addEventListener('click', escucharPuerto);
});

