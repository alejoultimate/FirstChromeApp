function DriverForTesting2 (newConfiguration) {
  this.setConfiguration(newConfiguration);
}

// inherits From DriverForAnalyzer
DriverForTesting2.prototype = new DriverForAnalyzer(null);

DriverForTesting2.prototype.driverResponse = function () {
  // Imprimir en pantalla la configuración del driver
  console.log(this.getConfiguration());
  // Imprimir en pantalla el protocolo ASTM
  console.log(this.getProtocolASTM());
  // Respuesta automática
  return "Respuesta automatica testing 2 : " + this.getStringReceived();
};
