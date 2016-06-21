function DriverForTesting (newConfiguration) {
  this.setConfiguration(newConfiguration);
}

// inherits From DriverForAnalyzer
DriverForTesting.prototype = new DriverForAnalyzer(null);


// Convertir la Data en un registro Header ASTM
DriverForTesting.prototype.convertDataToHeaderASTM = function (data) {
  // Definir  variables locales
  var header = new HeaderASTM();
  var dataModified = "";
  
  // Se limpian los caracteres especiales de la Data
  var cleanData = this.cleanSpecialCharacters(data);
  // Se modifica la ID del remitente del Header
  header.setSenderID(cleanData);
  // Se obtiene la Data del Header modificada y se adiciona un caracter line feed (fin de linea)
  // para que detecte el fin de la trama configurada en el archivo driverforanalyzer.json
  dataModified = header.getDataModified() + String.fromCharCode(10);
  // Leer la Data modificada
  readStatus = this.readingDataEntry(dataModified);
  
  // Retornar la Data
  return dataModified;
};

// Para cambiar los datos
DriverForTesting.prototype.toChangeData = function (data) {
  // Definir  variables locales
  var dataModified = "";

  switch (true) {
    case (data.indexOf("Header") != -1):
      dataModified = this.convertDataToHeaderASTM(data);
      break;
    case (data.indexOf("Patient") != -1):
      console.log("Patient");
      break;
    case (data.indexOf("Order") != -1):
      console.log("Order");
      break;
    case (data.indexOf("Result") != -1):
      console.log("Result");
      break;
    case (data.indexOf("Query") != -1):
      console.log("Query");
      break;
    case (data.indexOf("Comment") != -1):
      console.log("Comment");
      break;
    case (data.indexOf("FinalRecord") != -1):
      console.log("FinalRecord");
      break;
    default:
      console.log("Comment default");
  }

  // Retornar la Data
  return dataModified;
};

// Implementar driverResponse
DriverForTesting.prototype.driverResponse = function () {
  // Imprimir en pantalla la configuración del driver
  console.log(this.getConfiguration());
  // Imprimir en pantalla el protocolo ASTM
  console.log(this.getProtocolASTM());
  // Respuesta automática
  return "Respuesta automatica : " + this.getStringReceived();
};
