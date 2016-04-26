

function func1() {
  document.querySelector('#greeting').innerText =
    'Hello, World! It is ' + new Date() + ' ..... esto va muy bien';
}


function myFunction() {
    console.log("Hello! I am an alert box!");
}

function conectarPuerto() {
    var puerto = new Puerto( "COM1" );
    puerto.abrirPuerto();
    
    document.getElementById('demo').innerHTML = "Puerto conectado";
      
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


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('conectarButton').addEventListener('click', conectarPuerto);
});

