(function() {
  //var btnClose = document.querySelector(".close");
  var logArea = document.querySelector(".log");
  var statusLine = document.querySelector("#status");
  var serialDevices = document.querySelector(".serial_devices");
  var arrayConexionPuertos = [];
  var configurationOfAnalyzer = new ConfigurationOfAnalyzer();
  var arrayDriverAnalyzer = [];
  
  var init = function() {
    if (!serial_lib)
      throw "You must include serial.js before";
    configurationOfAnalyzer.loadConfiguration(onLoadAnalyzerJSON);
    initFormPuertoSerial();
    //btnClose.addEventListener("click", closeDevice);
    //window.addEventListener("hashchange", changeTab);
    document.querySelector(".refresh").addEventListener("click", refreshPorts);
    refreshPorts();
  };
  
  
  var openDevice = function(configuration) {
    statusLine.classList.add("on");
    statusLine.textContent = "Connecting";
    serial_lib.openDevice(configuration, onOpen);
  };
  
  var closeDevice = function(index) {
   if (arrayConexionPuertos[index] !== null) {
     arrayConexionPuertos[index].close();
   }
  };
  
  
  var refreshPorts = function() {
    while (serialDevices.options.length > 0)
      serialDevices.options.remove(0);

    serial_lib.getDevices(function(puertos) {
      logSuccess("got " + puertos.length + " ports");
      for (var i = 0; i < puertos.length; ++i) {
        var path = puertos[i].path;
        serialDevices.options.add(new Option(path, path));
        if (i === 1 || /usb/i.test(path) && /tty/i.test(path)) {
          serialDevices.selectionIndex = i;
          logSuccess("auto-selected " + path);
        }
      }
    });
    
  };


  var initFormPuertoSerial = function() {
    crearBotonesPuertoSerial();
  };
  
  var crearBotonesPuertoSerial = function() {
      serial_lib.getDevices(function(puertos) {
          for (var i = 0; i < puertos.length; ++i) {
            // Crear tabla de puertos
            var table = document.getElementById("tblPuertos");
            var row = table.insertRow(0);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            // Crear boton puerto serial
            var path = puertos[i].path;
            var btn = document.createElement("button");
            var t = document.createTextNode(path);
            btn.appendChild(t);
            btn.setAttribute("class", "button");
            document.body.appendChild(btn);
            document.getElementById("misOperaciones").appendChild(btn);
            // Adicionar el botón a la tabla de puertos
            cell1.appendChild( btn );
            // Crear input tipo checkbox para la conexión del puerto serial
            var inp = document.createElement("INPUT");
            inp.setAttribute("type", "checkbox");
            inp.setAttribute("class", "checkbox");
            inp.setAttribute("name", "chkPuertoSerial" + i);
            inp.setAttribute("id", "chkPuertoSerial" + i);
            document.getElementById("puertos").appendChild(inp);
            // Adicionar el input tipo checkbox a la tabla de puertos
            cell2.appendChild( inp );
            // Crear presentación del input tipo checkbox
            var initialize = new Switchery(inp);
          }
      });
      var parentTblPuertos = document.querySelector("#tblPuertos");
      parentTblPuertos.addEventListener("change", opencloseDevice, false);
  };
  
  
  function opencloseDevice(e) {
    try {
      if (e.target !== e.currentTarget) {
          var clickedItem = e.target.id;
          var indexPuertoActual = document.getElementById(clickedItem).parentElement.parentElement.rowIndex;
          var puertoChequeado = document.getElementById(clickedItem).checked;
          if ( puertoChequeado ) {
            var path = document.getElementsByTagName('button')[indexPuertoActual].textContent;
            configurationOfAnalyzer.items[indexPuertoActual].index = indexPuertoActual;
            configurationOfAnalyzer.items[indexPuertoActual].pathSerialPort = path;
            openDevice(configurationOfAnalyzer.items[indexPuertoActual]);
            var classNameDriverAnalyzer = configurationOfAnalyzer.items[indexPuertoActual].nameDriverAnalyzer;
            var driverAnalyzer = new window[classNameDriverAnalyzer](configurationOfAnalyzer.items[indexPuertoActual]);
            arrayDriverAnalyzer.push(driverAnalyzer);
          } else {
            closeDevice(indexPuertoActual);
          }
      }
      e.stopPropagation();
    }
    catch(err) {
      logError("Ocurrió el siguiente error: " + err.message);
    }
  }

  
  var addListenerToElements = function(eventType, selector, listener) {
      var addListener = function(type, element, index) {
        element.addEventListener(type, function(e) {
          listener.apply(this, [e, index]);
        });
      };
      var elements = document.querySelectorAll(selector);
      for (var i = 0; i < elements.length; ++i) {
        addListener(eventType, elements[i], i);
      }
  };

  
  var log = function(msg) {
    console.log(msg);
    logArea.innerHTML = msg + "<br/>" + logArea.innerHTML;
  };
  
  var logSuccess = function(msg) {
      log("<span style='color: green;'>" + msg + "</span>");
  };

  var logError = function(msg) {
    statusLine.className = "error";
    statusLine.textContent = msg;
    log("<span style='color: red;'>" + msg + "</span>");
  };

  var onOpen = function(newConnection, connectionId, index) {
    if (newConnection === null) {
      logError("Failed to open device.");
      return;
    }
    arrayConexionPuertos[index] = newConnection;
    arrayConexionPuertos[index].onReceive.addListener(onReceive);
    arrayConexionPuertos[index].onError.addListener(onError);
    arrayConexionPuertos[index].onClose.addListener(onClose);
    log("Id. conexion ABIERTO " + connectionId);
    logSuccess("Device opened.");
//    enableOpenButton(false);
    statusLine.textContent = "Connected";
  };

  var onReceive = function(index, connectionId, data) {
    var dataOutput = "";
    dataOutput = arrayDriverAnalyzer[index].readingAndResponseDataEntry(data);
    if (dataOutput.length > 0)
      sendSerial(index, dataOutput);
  };
  
  var sendSerial = function(index, message) {
    if (arrayConexionPuertos[index] === null) {
      return;
    }
    if (!message) {
      logError("Nothing to send!");
      return;
    }
    if (message.charAt(message.length - 1) !== '\n') {
      message += "\n";
    }
    arrayConexionPuertos[index].send(message);
  };
  
  var onError = function(index, errorInfo) {
    if (errorInfo.error !== 'timeout') {
      logError("Fatal error encounted. Dropping connection.");
      closeDevice(index);
    }
  };
  
  var onClose = function(index) {
    arrayConexionPuertos[index] = null;
    limpiarArraySinValoresNulos(arrayConexionPuertos);
    statusLine.textContent = "Hover here to connect";
    statusLine.className = "";
  };
  
  function limpiarArraySinValoresNulos(array) {
    var eliminar = true;
    for (var i = 0; i < array.length; ++i) {
    if ( array[i] !== null && array[i] !== undefined) {
        eliminar = false;
      }
    }
    if (eliminar) {
          while (array.length > 0)
            array.splice(0, 1);  
    }
  }

  var onLoadAnalyzerJSON = function(response) {
    configurationOfAnalyzer.items = JSON.parse(response);
  };

/////////////////////////////////////////////////////////////////////////
/// mi código de prueba
/////////////////////////////////////////////////////////////////////////

  function bienvenida() {
    document.querySelector('#saludo').innerText =
      'Hola, bienvenido a la mejor app para puerto serial! hoy es ' + new Date();
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
  
  
  addLoadEvent(bienvenida);

  
  init();
})();
