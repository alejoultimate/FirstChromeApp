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


function DriverForAnalyzer (newConfiguration) {
  var protocolASTM = new ProtocolASTM();
  var stringReceived = '';
  var configuration = newConfiguration;
  
  this.setProtocolASTM = function(newProtocolASTM) {
    protocolASTM = newProtocolASTM;
  };
  
  this.getProtocolASTM = function() {
    return protocolASTM;
  };

  this.setStringReceived = function(newStringReceived) {
    stringReceived = newStringReceived;
    
  };
  
  this.addStringReceived = function(newStringReceived) {
    stringReceived += newStringReceived;
    
  };

  this.getStringReceived = function() {
    return stringReceived;
  };
  
  this.setConfiguration = function(newConfiguration) {
    configuration = newConfiguration;
  };
  
  this.getConfiguration = function() {
    return configuration;
  };

}


DriverForAnalyzer.prototype.isResponseRequired = function () {
  // Obtener la última posición del string de datos recibidos
  var lastPosition = this.getStringReceived().length - 1;
  var asciiValue = this.getStringReceived().charCodeAt(lastPosition);
  var specialCharacters = this.getConfiguration().specialCharacters;
  var index = specialCharacters.findIndex(xobj => xobj.asciiValue==asciiValue);
  if ( index < 0 )
    return false;
  return specialCharacters[index].responseRequired;
};


DriverForAnalyzer.prototype.cleanSpecialCharacters = function (data) {
  var arraySpecialCharacters =  [ 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31 ];
  var newData = "";
  for (i = 0; i < data.length; i++) {
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
  this.addStringReceived(data);
  // Nuevo string limpio de caracteres especiales
  var newStringReceived = this.cleanSpecialCharacters(this.getStringReceived());
  // Leer la data desde el protocolo ASTM
  var readStatus = this.getProtocolASTM().readInputData(newStringReceived);
  return readStatus;
};


DriverForAnalyzer.prototype.driverResponse = function () {
  // < Se debe heredar este metodo y crear la respuesta de cada Driver >
  return ""  ;
};


DriverForAnalyzer.prototype.responseDataEntry = function (readStatus) {
  // Definir la variable de salida
  var dataOutput = "";
  // Validar si requiere una respuesta del Driver
  if ( this.isResponseRequired() ) {
    // Validar que los datos de entrada se hayan leído correctamente
    if ( readStatus )
      // Respuesta del Driver
      dataOutput = this.driverResponse();
    // Limpiar el buffer de los datos recibidos
    this.setStringReceived("");
  }
  return dataOutput;
};

DriverForAnalyzer.prototype.readingAndResponseDataEntry = function (data) {
  // Leer los datos de entrada
  var readStatus = this.readingDataEntry(data);
  // Respuesta del Driver
  return this.responseDataEntry(readStatus);
};

///////////////////////////////////////////////////////////
/*  Esta es la implementación del "Driver para pruebas"  */
///////////////////////////////////////////////////////////

function DriverForTesting (newConfiguration) {
  this.setConfiguration(newConfiguration);
}

// inherits From DriverForAnalyzer
DriverForTesting.prototype = new DriverForAnalyzer(null);

DriverForTesting.prototype.driverResponse = function () {
  // Imprimir en pantalla la configuración del driver
  console.log(this.getConfiguration());
  // Imprimir en pantalla el protocolo ASTM
  console.log(this.getProtocolASTM());
  // Respuesta automática
  return "Respuesta automatica : " + this.getStringReceived();
};

////////////////////////////////////////
/*  Hasta aquí "Driver para pruebas"  */
////////////////////////////////////////
