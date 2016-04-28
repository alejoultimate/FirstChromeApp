(function() {
  var btnOpen = document.querySelector(".open");
  var btnClose = document.querySelector(".close");
  var logArea = document.querySelector(".log");
  var statusLine = document.querySelector("#status");
  var serialDevices = document.querySelector(".serial_devices");
  var connection = null;
  var stringReceived = '';

  var init = function() {
    if (!serial_lib)
      throw "You must include serial.js before";

    //enableOpenButton(true);
    btnOpen.addEventListener("click", openDevice);
    btnClose.addEventListener("click", closeDevice);
    //window.addEventListener("hashchange", changeTab);
    document.querySelector(".refresh").addEventListener("click", refreshPorts);
    //initADKListeners();
    refreshPorts();
  };
  
   var openDevice = function() {
    var selection = serialDevices.selectedOptions[0];
    if (!selection) {
      logError("No port selected.");
      return;
    }
    var path = selection.value;
    statusLine.classList.add("on");
    statusLine.textContent = "Connecting";
    //enableOpenButton(false);
    serial_lib.openDevice(path, onOpen);
  };
  
  var closeDevice = function() {
   if (connection !== null) {
     connection.close();
   }
  };
  
  
  var refreshPorts = function() {
    while (serialDevices.options.length > 0)
      serialDevices.options.remove(0);

    serial_lib.getDevices(function(items) {
      logSuccess("got " + items.length + " ports");
      for (var i = 0; i < items.length; ++i) {
        var path = items[i].path;
        serialDevices.options.add(new Option(path, path));
        if (i === 1 || /usb/i.test(path) && /tty/i.test(path)) {
          serialDevices.selectionIndex = i;
          logSuccess("auto-selected " + path);
        }
      }
    });
  };


  var initADKListeners = function() {
      addListenerToElements("change", ".servos input[type='range']", function(e, index) {
          sendSerial("s" + index + toHexString(parseInt(this.value)));
      });
      addListenerToElements("change", ".leds input[type='range']", function(e, index) {
          this.nextSibling.textContent = this.value;
          sendSerial("c" + index + toHexString(parseInt(this.value)));
      });
      addListenerToElements("click", ".relays button", function(e, index) {
        if (this.classList.contains("on")) {
          // turn it off
          this.classList.remove("on");
          this.textContent = "Off";
          sendSerial("t" + index + "0");
        } else {
          // turn it on
          this.classList.add("on");
          this.textContent = "On";
          sendSerial("t" + index + "1");
        }
      });
      setInterval(function() { sendSerial("data"); }, SENSOR_REFRESH_INTERVAL);
  };  



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

  var onOpen = function(newConnection) {
    if (newConnection === null) {
      logError("Failed to open device.");
      return;
    }
    connection = newConnection;
    connection.onReceive.addListener(onReceive);
    connection.onError.addListener(onError);
    connection.onClose.addListener(onClose);
    logSuccess("Device opened.");
//    enableOpenButton(false);
    statusLine.textContent = "Connected";
  };

 var onReceive = function(data) {
  /*  if (data.indexOf("log:") >= 0) {
      return;
    }
    var m = /([^:]+):([-]?\d+)(?:,([-]?\d+))?/.exec(data);
    if (m && m.length > 0) {
      switch (m[1]) {
        case "b1":
          document.querySelector("#b1").className = m[2] === "0" ? "" : "on";
          break;
        case "b2":
          document.querySelector("#b2").className = m[2] === "0" ? "" : "on";
          break;
        case "b3":
          document.querySelector("#b3").className = m[2] === "0" ? "" : "on";
          break;
        case "c":
          document.querySelector("#bc").className = m[2] === "0" ? "" : "on";
          log(data);
          break;
        case "js":
          document.querySelector("#joy .pointer").className = m[2] === "0" ? "pointer" : "pointer on";
          break;
        case "t":
          document.querySelector("#temp").textContent = convertTemperature(m[2]);
          break;
        case "l":
          document.querySelector("#light").textContent = Math.round((1000 * parseInt(m[2]) / 1024)) / 10;
          document.querySelector("#lightv1").textContent = m[2];
          break;
        case "jxy":
          var el = document.querySelector("#joy .pointer");
          el.style.left = ((128 + parseInt(m[2]) * 0.6) / 256.0 * el.parentElement.offsetWidth) + "px";
          el.style.top = ((128 + parseInt(m[3]) * 0.9) / 256.0 * el.parentElement.offsetHeight) + "px";
          el.textContent = m[2] + "," + m[3];
          break;
      }
    }*/
    
/*    if (data.charAt(data.length-1) === '\n') {
      stringReceived += data.substring(0, data.length-1);
      log(stringReceived);
      sendSerial("TX: recibi esto: " + stringReceived); 
      onLineReceived(stringReceived);
      stringReceived = '';
    } else {
      stringReceived += data;
    }*/
    
    stringReceived += data;
    log(data);
    
  };
  
  var sendSerial = function(message) {
    if (connection === null) {
      return;
    }
    if (!message) {
      logError("Nothing to send!");
      return;
    }
    if (message.charAt(message.length - 1) !== '\n') {
      message += "\n";
    }
    connection.send(message);
  };
  
  var onError = function(errorInfo) {
    if (errorInfo.error !== 'timeout') {
      logError("Fatal error encounted. Dropping connection.");
      closeDevice();
    }
  };
  
  var onClose = function(result) {
    connection = null;
    //enableOpenButton(true);
    statusLine.textContent = "Hover here to connect";
    statusLine.className = "";
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
