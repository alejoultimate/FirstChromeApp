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
    console.log("Instanciar solo una vez DriverForAnalyzer");
}

DriverForAnalyzer.prototype.readInputData = function (data) {
    this.protocolASTM.readInputData(data);
    console.log(this.protocolASTM);
};


function DriverForCA1500 () {
  console.log("Instanciar solo una vez DriverForCA1500");
}

// inherits From DriverForAnalyzer
DriverForCA1500.prototype = new DriverForAnalyzer();


