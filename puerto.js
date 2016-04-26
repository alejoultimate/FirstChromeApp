  function Puerto(rutaDelPuertoSerial) {
    this.connectionId = -1;
    this.rutaDelPuertoSerial = rutaDelPuertoSerial;
  }


  Puerto.prototype.abrirPuerto = function () {
    var onConnect = function(connectionInfo) {
      // The serial port has been opened. Save its id to use later.
      this.connectionId = connectionInfo.connectionId;
      // Do whatever you need to do with the opened port.
    };
    // Connect to the serial port /dev/ttyS01
    chrome.serial.connect(this.rutaDelPuertoSerial, {bitrate: 9600, ctsFlowControl: true}, onConnect);
  };
  
  
  
  Puerto.prototype.escucharPuerto = function () {
    var stringReceived = '';
  
    var onReceiveCallback = function(info) {
      if (info.connectionId == this.connectionId && info.data) {
        var str = convertArrayBufferToString(info.data);
        if (str.charAt(str.length-1) === '\n') {
          stringReceived += str.substring(0, str.length-1);
          onLineReceived(stringReceived);
          stringReceived = '';
        } else {
          stringReceived += str;
        }
      }
    };

    chrome.serial.onReceive.addListener(onReceiveCallback);
    
    console.log("Escuchando: " + stringReceived);
    
  };