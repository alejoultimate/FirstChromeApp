describe("DriverForTesting", function() {
  var driverForTesting;
  var configurationOfAnalyzer = new ConfigurationOfAnalyzer();
  var fileJSON = '[' +
      '{' +
          '"index": null,' +
          '"nameDriverAnalyzer": "DriverForTesting",' +
          '"descriptionAnalyzer": "Interfaz para realizar pruebas",' +
          '"nameFileJS": "driverfortesting.js",' +
          '"pathSerialPort": null,' +
          '"connectionOptions": { "bitrate": 57600 },' +
          '"specialCharacters":  [' +
                                  '{' +
                                    '"key": "ENQ",' +
                                    '"asciiValue": 5,' +
                                    '"responseRequired": true' +
                                  '},' +
                                  '{' +
                                    '"key": "STX",' +
                                    '"asciiValue": 2,' +
                                    '"responseRequired": false' +
                                  '},' +
                                  '{' +
                                    '"key": "ETX",' +
                                    '"asciiValue": 3,' +
                                    '"responseRequired": true' +
                                  '},' +
                                  '{' +
                                    '"key": "RS",' +
                                    '"asciiValue": 30,' +
                                    '"responseRequired": false' +
                                  '},' +
                                  '{' +
                                    '"key": "CR",' +
                                    '"asciiValue": 13,' +
                                    '"responseRequired": true' +
                                  '},' +
                                  '{' +
                                    '"key": "LF",' +
                                    '"asciiValue": 10,' +
                                    '"responseRequired": true' +
                                  '},' +
                                  '{' +
                                    '"key": "GS",' +
                                    '"asciiValue": 29,' +
                                    '"responseRequired": false' +
                                  '},' +
                                  '{' +
                                    '"key": "EOT",' +
                                    '"asciiValue": 4,' +
                                    '"responseRequired": true' +
                                  '},' +
                                  '{' +
                                    '"key": "ACK",' +
                                    '"asciiValue": 6,' +
                                    '"responseRequired": true' +
                                  '},' +
                                  '{' +
                                    '"key": "NACK",' +
                                    '"asciiValue": 15,' +
                                    '"responseRequired": false' +
                                  '}' +
                                ']' +
      '}' +
  ']';
  
  beforeEach(function() {
    configurationOfAnalyzer.items = JSON.parse(fileJSON);
    driverForTesting = new DriverForTesting(configurationOfAnalyzer.items[0]);
  });
  
  it( "Convertir un dato a un Header ASTM válido", function() {
    var initialData = "esto es un Header";
    var dataWithEnter = initialData + String.fromCharCode(10);
    var newData = driverForTesting.convertDataToHeaderASTM(dataWithEnter);

    expect(initialData).not.toEqual(newData);
    expect(newData).toEqual("H|\\^&|||" + initialData + "|||||||||" + String.fromCharCode(10));
  });

  it( "Leer un dato, convertirlo en Header y esperar una respuesta", function() {
    var data = "";
    var dataOutput = "";

    //debugger;
    
    data = "este es un Header de prueba";
    dataOutput = driverForTesting.readingAndResponseDataEntry(data);
    
    expect(dataOutput).toEqual("Respuesta automatica : " + "H|\\^&|||" + data + "|||||||||" + String.fromCharCode(10));
  });

  it( "Leer un dato, convertirlo en Patient y esperar una respuesta", function() {
    var data = "";
    var dataOutput = "";

    data = "este es un Patient de prueba";
    dataOutput = driverForTesting.readingAndResponseDataEntry(data);
    
    expect(dataOutput).toEqual("Respuesta automatica : " + "P||" + data + "||||||||||||||||||||||||||||||||" + String.fromCharCode(10));
  });
});