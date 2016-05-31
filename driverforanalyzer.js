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


function DriverForAnalyzer () {
  this.protocolASTM = new ProtocolASTM();
  this.stringReceived = '';
}

DriverForAnalyzer.prototype.isResponseRequired = function (specialCharacters, asciiValue) {
  var index = specialCharacters.findIndex(x => x.asciiValue==asciiValue);
  if ( index < 0 )
    return false;
  return specialCharacters[index].responseRequired;
};


DriverForAnalyzer.prototype.cleanSpecialCharacters = function (data) {
  var arrayAscciiValue =  [ 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31 ];
  var newData = "";
  for (i = 1; i < data.length - 1; i++) {
        ch = data.charCodeAt(i);
        var index = arrayAscciiValue.indexOf(ch);
        if (ch >= 0) {
            newData += data.charAt(i);
        }
  }
  return newData;
};


DriverForAnalyzer.prototype.readingDataEntry = function (configuration) {
    // Obtener la última posición del string de datos recibidos
    var lastPosition = this.stringReceived.length - 1;
    // Validar si requiere una respuesta del Driver
    if (this.isResponseRequired(configuration.specialCharacters, this.stringReceived.charCodeAt(lastPosition))) {
      var newStringReceived = this.cleanSpecialCharacters(this.stringReceived);
      this.protocolASTM.readInputData(newStringReceived);
      // Imprimir en pantalla el protocolo ASTM
      console.log(this.protocolASTM);
    }
};


DriverForAnalyzer.prototype.responseDataEntry = function (configuration) {
    var dataOutput = "";
    // Obtener la última posición del string de datos recibidos
    var lastPosition = this.stringReceived.length - 1;
    // Validar si requiere una respuesta del Driver
    if (this.isResponseRequired(configuration.specialCharacters, this.stringReceived.charCodeAt(lastPosition))) {
      // Respuesta automática
      dataOutput = "Respuesta automatica : " + this.stringReceived;
      // Limpiar el buffer de los datos recibidos
      this.stringReceived = "";
    }
    return dataOutput;
};


DriverForAnalyzer.prototype.readingAndResponseDataEntry = function (data, configuration) {
    // Concatenar los datos recibidos
    this.stringReceived += data;
    // Lectura del Driver
    this.readingDataEntry(configuration);
    // Respuesta del Driver
    return this.responseDataEntry(configuration);
};


function DriverForCA1500 () {
  console.log("Instanciar solo una vez DriverForCA1500");
}

// inherits From DriverForAnalyzer
DriverForCA1500.prototype = new DriverForAnalyzer();


