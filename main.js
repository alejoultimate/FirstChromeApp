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

  
  var createChkSerialPort = function (index) {
    // Crear input tipo checkbox para la conexión del puerto serial
    var inp = document.createElement("INPUT");
    inp.setAttribute("type", "checkbox");
    inp.setAttribute("class", "checkbox");
    inp.setAttribute("name", "chkPuertoSerial" + index);
    inp.setAttribute("id", "chkPuertoSerial" + index);
    document.getElementById("puertos").appendChild(inp);
    
    return inp;
  };
  
  var createBtnSerialPort = function (path) {
    // Crear boton puerto serial
    var btn = document.createElement("button");
    var t = document.createTextNode(path);
    btn.appendChild(t);
    btn.setAttribute("class", "button");
    
    return btn;
  };
  

  var generateViewSerialPort = function () {

      //Create a HTML Table element.
      var table = document.createElement("TABLE");
      table.id = "tblPuertos";
      table.border = "1";

    
      serial_lib.getDevices(function(puertos) {
        
          //Build an array containing Customer records.
          var arrayVistaPuertos = [];
          arrayVistaPuertos.push(["Customer Id", "Nombre de la interfaz", "Conectar", "Editar"]);

          var path = "";
          var btn = null;
          var inp = null;
          var descriptionAnalyzer = "";
          for (var indexAnalyzer = 0; indexAnalyzer < puertos.length; ++indexAnalyzer) {
            // Crear etiqueta con el nombre de la interfaz
            descriptionAnalyzer = configurationOfAnalyzer.items[indexAnalyzer].descriptionAnalyzer;
            // Crear boton puerto serial
            path = puertos[indexAnalyzer].path;
            btn = createBtnSerialPort(path);
             // Crear input tipo checkbox para la conexión del puerto serial
            inp = createChkSerialPort(indexAnalyzer);
            arrayVistaPuertos.push([indexAnalyzer, configurationOfAnalyzer.items[indexAnalyzer].descriptionAnalyzer, inp, btn]);
          }
          
    
          //Get the count of columns.
          var columnCount = arrayVistaPuertos[0].length;
    
          //Add the header row.
          var row = table.insertRow(-1);
          for (var posHeader = 0; posHeader < columnCount; posHeader++) {
              var headerCell = document.createElement("TH");
              headerCell.innerHTML = arrayVistaPuertos[0][posHeader];
              row.appendChild(headerCell);
          }
    
          //Add the data rows.
          for (var i = 1; i < arrayVistaPuertos.length; i++) {
              row = table.insertRow(-1);
              for (var j = 0; j < columnCount; j++) {
                  var cell = row.insertCell(-1);
                  switch (j) {
                    case 2:
                      cell.appendChild( arrayVistaPuertos[i][j] );
                      var initialize = new Switchery( arrayVistaPuertos[i][j] );
                      break;
                    case 3:
                      cell.appendChild( arrayVistaPuertos[i][j] );
                      break;
                    default:
                      cell.innerHTML = arrayVistaPuertos[i][j];  
                  }
              }
          }
          
          
      });
      
      var dvTable = document.getElementById("puertos");
      //dvTable.innerHTML = "";
      dvTable.appendChild(table);
      
      
      var parentTblPuertos = document.querySelector("#tblPuertos");
      parentTblPuertos.addEventListener("change", opencloseDevice, false);

  };

  
  
  function opencloseDevice(e) {
    try {
      if (e.target !== e.currentTarget) {
          var clickedItem = e.target.id;
          var indexPuertoActual = document.getElementById(clickedItem).parentElement.parentElement.rowIndex - 1;
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
    generateViewSerialPort();
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
