function DriverForAnalyzer () {
  
}

DriverForAnalyzer.prototype.readInputData = function (data) {
    var protocol = new ProtocolASTM();
    protocol.readInputData(data);
    console.log(protocol);
};


function DriverForCA1500 () {
  
}

// inherits From DriverForAnalyzer
DriverForCA1500.prototype = new DriverForAnalyzer();
