/**

Driver para conectar los equipos analizadores

**/

function ConfigurationOfAnalyzer () {
  this.items = null;
}

ConfigurationOfAnalyzer.prototype.loadConfiguration = function (callback) {
  var xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/json");
	xobj.open('GET', 'driverforanalyzer.json', true); // file JSON
	xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
  };
  xobj.send(null);  
};


function DriverForAnalyzer (configuration) {
  this.protocolASTM = new ProtocolASTM();
  this.stringReceived = '';
  this.configuration = configuration;
}

DriverForAnalyzer.prototype.isResponseRequired = function () {
  // Obtener la última posición del string de datos recibidos
  var lastPosition = this.stringReceived.length - 1;
  var asciiValue = this.stringReceived.charCodeAt(lastPosition);
  var specialCharacters = this.configuration.specialCharacters;
  var index = specialCharacters.findIndex(xobj => xobj.asciiValue==asciiValue);
  if ( index < 0 )
    return false;
  return specialCharacters[index].responseRequired;
};


DriverForAnalyzer.prototype.cleanSpecialCharacters = function (data) {
  var arraySpecialCharacters =  [ 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31 ];
  var newData = "";
  for (i = 0; i < data.length - 1; i++) {
        ch = data.charCodeAt(i);
        // Buscar el caracter en el array de caracteres especiales
        if ( arraySpecialCharacters.indexOf(ch) === -1 ) {
            // Concatenar los caraceteres que NO son especiales
            newData += data.charAt(i);
        }
  }
  return newData;
};


DriverForAnalyzer.prototype.readingDataEntry = function (data) {
  // Concatenar los datos recibidos
  this.stringReceived += data;
  // Nuevo string limpio de caracteres especiales
  var newStringReceived = this.cleanSpecialCharacters(this.stringReceived);
  // Leer la data desde el protocolo ASTM
  var readStatus = this.protocolASTM.readInputData(newStringReceived);
  //if (readStatus)
    // Imprimir en pantalla el protocolo ASTM
    console.log(this.protocolASTM);
  return readStatus;
};


DriverForAnalyzer.prototype.responseDataEntry = function (readStatus) {
  // Definir la variable de salida
  var dataOutput = "";
  // Validar si requiere una respuesta del Driver
  if ( this.isResponseRequired() ) {
    // Validar que los datos de entrada se hayan leído correctamente
    if ( readStatus )
      // Respuesta automática
      dataOutput = "Respuesta automatica : " + this.stringReceived;
    // Limpiar el buffer de los datos recibidos
    this.stringReceived = "";
  }
  return dataOutput;
};


DriverForAnalyzer.prototype.readingAndResponseDataEntry = function (data) {
  // Leer los datos de entrada
  var readStatus = this.readingDataEntry(data);
  // Respuesta del Driver
  return this.responseDataEntry(readStatus);
};


function DriverForCA1500 (configuration) {
  this.configuration = configuration;
  console.log(this.configuration);
}

// inherits From DriverForAnalyzer
DriverForCA1500.prototype = new DriverForAnalyzer(null);


