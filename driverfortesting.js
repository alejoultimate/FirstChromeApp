function DriverForTesting (newConfiguration) {
  this.setConfiguration(newConfiguration);
}

// inherits From DriverForAnalyzer
DriverForTesting.prototype = new DriverForAnalyzer(null);


// Implementar convertDataToRecordASTM
DriverForTesting.prototype.convertDataToRecordASTM = function (data) {
  var headerASTM = "";
  var commentASTM = "";
  var readStatus = false;
  
  // Nuevo dato limpio de caracteres especiales
  var cleanData = this.cleanSpecialCharacters(data);
  
  // Crear un Header ASTM
  headerASTM = "H|\\^&|||EPOC^Blood Analysis^EDM^Data Manager|||||||P||2016329104641" + String.fromCharCode(10);
  // Leer los datos de entrada
  readStatus = this.readingDataEntry(headerASTM);
  
  // Limpiar el buffer de los datos recibidos
  this.setStringReceived("");
  
  // Crear un Comment ASTM
  commentASTM = "C|1|L|" + cleanData + "|" + String.fromCharCode(10);
  // Leer los datos de entrada
  readStatus = this.readingDataEntry(commentASTM);

  return commentASTM;
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
