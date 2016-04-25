function abrirPuerto(nombrePuerto) {
  var onConnect = function(connectionInfo) {
     // The serial port has been opened. Save its id to use later.
    _this.connectionId = connectionInfo.connectionId;
    // Do whatever you need to do with the opened port.
  };
  // Connect to the serial port /dev/ttyS01
  chrome.serial.connect(nombrePuerto, {bitrate: 115200}, onConnect);  
}

