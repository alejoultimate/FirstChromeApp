(function() {
  //var btnClose = document.querySelector(".close");
  var logArea = document.querySelector(".log");
  var statusLine;
  var serialDevices = document.querySelector(".serial_devices");
  var arrayConexionPuertos = [];
  var configurationOfAnalyzer = new ConfigurationOfAnalyzer();
  var arrayDriverAnalyzer = [];
  
  var init = function() {
    Logger.show();
    if (!serial_lib)
      throw "You must include serial.js before";
    configurationOfAnalyzer.loadConfiguration(onLoadAnalyzerJSON);
  };
  
  
  var openDevice = function(configuration) {
    statusLine[configuration.index].textContent = "Connecting";
    serial_lib.openDevice(configuration, onOpen);
  };
  
  var closeDevice = function(index) {
    if (typeof arrayConexionPuertos[index] != "undefined") {
     arrayConexionPuertos[index].close();
    }
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
    btn.setAttribute("class", "btn btn-primary");
    
    return btn;
  };
  
  var createDivStatusSerialPort = function (index) {
    // Crear un div para manejar el estado del puerto serial
    var div = document.createElement("div");
    var text = document.createTextNode("No connected");
    div.appendChild(text);
    div.setAttribute("id", "status");

    return div;
  };
  

  var generateViewSerialPort = function () {
      //Create a HTML Table element.
      var table = document.createElement("TABLE");
      table.setAttribute("class", "table");
      table.id = "tblPuertos";
      table.border = "1";
      // Obtener el listado de todos los dispositivos
      serial_lib.getDevices(function(puertos) {
          // Array que contiene los puertos seriales que vamos a listar en pantalla
          var arrayVistaPuertos = [];
          arrayVistaPuertos.push(["# indice", "Nombre de la interfaz", "Conectar", "Editar", "Estado"]);
          // Definir variables
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
            // Crear un div para manejar el estado del puerto serial
            div = createDivStatusSerialPort(indexAnalyzer);
            arrayVistaPuertos.push([indexAnalyzer, descriptionAnalyzer, inp, btn, div]);
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
                  switch ( typeof arrayVistaPuertos[i][j] ) {
                    case "object":
                      cell.appendChild( arrayVistaPuertos[i][j] );
                      if ( j === 2 ) {
                        var initialize = new Switchery( arrayVistaPuertos[i][j] );
                      }
                      break;
                    default:
                      cell.innerHTML = arrayVistaPuertos[i][j];
                  }
              }
          }
      });
      // Adicionar una tabla al Div de puertos
      var dvTable = document.getElementById("puertos");
      dvTable.appendChild(table);
      // Crear el listener para los cambios de estado del checkbox que hace la conexión al puerto serial
      var parentTblPuertos = document.querySelector("#tblPuertos");
      parentTblPuertos.addEventListener("change", opencloseDevice, false);
  };

  
  var addDriverAnalyzer = function (index) {
    var classNameDriverAnalyzer = configurationOfAnalyzer.items[index].nameDriverAnalyzer;
    var driverAnalyzer = new window[classNameDriverAnalyzer](configurationOfAnalyzer.items[index]);
    arrayDriverAnalyzer[index] = driverAnalyzer;
  };
  
  
  function opencloseDevice(e) {
    if (e.target !== e.currentTarget) {
        // Crear el objeto para reportar el estado de la conexión del puerto serial
        statusLine = document.querySelectorAll("#status");
        var clickedItem = e.target.id;
        var indexPuertoActual = document.getElementById(clickedItem).parentElement.parentElement.rowIndex - 1;
        var puertoChequeado = document.getElementById(clickedItem).checked;
        try {
          if ( puertoChequeado ) {
            var path = document.getElementsByTagName('button')[indexPuertoActual].textContent;
            configurationOfAnalyzer.items[indexPuertoActual].index = indexPuertoActual;
            configurationOfAnalyzer.items[indexPuertoActual].pathSerialPort = path;
            // Adicionar un nuevo driver analizador
            addDriverAnalyzer(indexPuertoActual);
            openDevice(configurationOfAnalyzer.items[indexPuertoActual]);
          } else {
            closeDevice(indexPuertoActual);
          }
        }
        catch(err) {
          logError(indexPuertoActual, "Ocurrió el siguiente error al abrir el dispositivo: " + err.message);
        }
    }
    e.stopPropagation();
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

  var logSuccess = function(msg) {
      log(msg);
  };

  var logError = function(index, msg) {
    statusLine[index].className = "error";
    log(msg);
  };

  var onOpen = function(newConnection, connectionId, index) {
    if (newConnection === null) {
      logError(index, "No se pudo abrir el dispositivo.");
      return;
    }
    arrayConexionPuertos[index] = newConnection;
    arrayConexionPuertos[index].onReceive.addListener(onReceive);
    arrayConexionPuertos[index].onError.addListener(onError);
    arrayConexionPuertos[index].onClose.addListener(onClose);
    //log("Id. conexion ABIERTO " + connectionId);
    logSuccess("Dispositivo abierto.");
    statusLine[index].textContent = "Connected";
  };

  var onReceive = function(index, connectionId, data) {
    var dataOutput = "";
    try {
      dataOutput = arrayDriverAnalyzer[index].readingAndResponseDataEntry(data);
      if (dataOutput.length > 0)
        sendSerial(index, dataOutput);
    }
    catch (error) {
      logError(index, "Ocurrió un error al recibir los datos: " + error.message);
    }
  };
  
  var sendSerial = function(index, message) {
    if (arrayConexionPuertos[index] === null) {
      return;
    }
    if (!message) {
      logError(index, "Nothing to send!");
      return;
    }
    if (message.charAt(message.length - 1) !== '\n') {
      message += "\n";
    }
    arrayConexionPuertos[index].send(message);
  };
  
  var onError = function(index, errorInfo) {
    if (errorInfo.error !== 'timeout') {
      logError(index, "Fatal error encounted. Dropping connection.");
      closeDevice(index);
    }
  };
  
  var onClose = function(index) {
    arrayConexionPuertos[index] = null;
    limpiarArraySinValoresNulos(arrayConexionPuertos);
    statusLine[index].textContent = "No connected";
    statusLine[index].className = "";
    logSuccess("Dispositivo cerrado.");
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

  init();
})();
