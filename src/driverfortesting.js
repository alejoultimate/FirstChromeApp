function DriverForTesting (newConfiguration) {
  this.setConfiguration(newConfiguration);
}

// inherits From DriverForAnalyzer
DriverForTesting.prototype = new DriverForAnalyzer(null);


// Aqui se define cuando se debe convertir los datos a un Header ASTM
DriverForTesting.prototype.whenIsHeader = function (data) {
  // < Se debe heredar este metodo y retornar true, para covertir la data
  // en un mensaje ASTM, cuando se cumpla una condición >
  return (data.indexOf("Header") != -1);
};


// Convertir la Data en un registro Header ASTM
DriverForTesting.prototype.convertDataToHeaderASTM = function (data) {
  // Definir  variables locales
  var header = new HeaderASTM();
  var dataModified = "";
  
  // Se limpian los caracteres especiales de la Data
  var cleanData = this.cleanSpecialCharacters(data);
  // Se modifica la ID del remitente del Header
  header.setSenderID(cleanData);
  // Se obtiene la trama ASTM modificada y se adiciona un caracter line feed (fin de linea)
  // para que detecte el fin de la trama configurada en el archivo driverforanalyzer.json
  dataModified = header.getDataModified() + String.fromCharCode(10);
  
  // Retornar la Data
  return dataModified;
};


DriverForTesting.prototype.whenIsPatient = function (data) {
  // < Se debe heredar este metodo y retornar true, para covertir la data
  // en un mensaje ASTM, cuando se cumpla una condición >
  return (data.indexOf("Patient") != -1);
};


// Convertir la Data en un registro Patient ASTM
DriverForTesting.prototype.convertDataToPatientASTM = function (data) {
  // Definir  variables locales
  var patient = new PatientASTM();
  var dataModified = "";
  
  // Se limpian los caracteres especiales de la Data
  var cleanData = this.cleanSpecialCharacters(data);
  // Se modifica la ID de la muestra
  patient.setSampleID(cleanData);
  // Se obtiene la trama ASTM modificada y se adiciona un caracter line feed (fin de linea)
  // para que detecte el fin de la trama configurada en el archivo driverforanalyzer.json
  dataModified = patient.getDataModified() + String.fromCharCode(10);
  
  // Retornar la Data
  return dataModified;
};

DriverForTesting.prototype.whenIsOrder = function (data) {
  // < Se debe heredar este metodo y retornar true, para covertir la data
  // en un mensaje ASTM, cuando se cumpla una condición >
  return (data.indexOf("Order") != -1);
};

DriverForTesting.prototype.convertDataToOrderASTM = function (data) {
  // Definir variables locales
  var order = new OrderASTM();
  var dataModified = "";
  
  // Se limpian los caracteres especiales de la Data
  var cleanData = this.cleanSpecialCharacters(data);
  // Establecer la ID de la muestra
  order.setSampleID(cleanData);
  // Se obtiene la trama ASTM modificada y se adiciona un caracter line feed (fin de linea)
  // para que detecte el fin de la trama configurada en el archivo driverforanalyzer.json
  dataModified = order.getDataModified() + String.fromCharCode(10);
  
  // Retornar la Data
  return dataModified;
};

DriverForTesting.prototype.whenIsResult = function (data) {
  // < Se debe heredar este metodo y retornar true, para covertir la data
  // en un mensaje ASTM, cuando se cumpla una condición >
  return (data.indexOf("Result") != -1);
};

DriverForTesting.prototype.convertDataToResultASTM = function (data) {
  // Definir variables locales
  var result = new ResultASTM();
  var dataModified = "";
  
  // Se limpian los caracteres especiales de la Data
  var cleanData = this.cleanSpecialCharacters(data);
  // Establecer la ID de la muestra
  result.setTestID(cleanData.substr(0, cleanData.indexOf("Result") + "Result".length ));
  // Establecer el valor del resultado de la muestra
  result.setResults(cleanData.substr(cleanData.indexOf("Result") + "Result".length + 1));
  
  // Se obtiene la trama ASTM modificada y se adiciona un caracter line feed (fin de linea)
  // para que detecte el fin de la trama configurada en el archivo driverforanalyzer.json
  dataModified = result.getDataModified() + String.fromCharCode(10);
  
  // Retornar la Data
  return dataModified;
};

DriverForTesting.prototype.whenIsFinalRecord = function (data) {
  // < Se debe heredar este metodo y retornar true, para covertir la data
  // en un mensaje ASTM, cuando se cumpla una condición >
  return (data.indexOf("FinalRecord") != -1);
};

DriverForTesting.prototype.convertDataToFinalRecordASTM = function (data) {
  // Definir variables locales
  var finalRecord = new FinalRecordASTM();
  var dataModified = "";
  
  // Se limpian los caracteres especiales de la Data
  var cleanData = this.cleanSpecialCharacters(data);
  // Se obtiene la trama ASTM modificada y se adiciona un caracter line feed (fin de linea)
  // para que detecte el fin de la trama configurada en el archivo driverforanalyzer.json
  dataModified = finalRecord.getDataModified() + String.fromCharCode(10);
  
  // Retornar la Data
  return dataModified;
};


// Implementar driverResponse
DriverForTesting.prototype.driverResponse = function () {
  // Imprimir en pantalla la configuración del driver
  console.log(this.getConfiguration());
  // Imprimir en pantalla el protocolo ASTM
  console.log(this.getProtocolASTM());
  
  this.saveProtocolAsText();

  this.sendResult();

  // Respuesta automática
  return "Respuesta automatica : " + this.getStringReceived();
};
