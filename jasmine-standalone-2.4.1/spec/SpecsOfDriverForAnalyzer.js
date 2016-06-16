describe("DriverForAnalyzer", function() {
  var driverForAnalyzer;
  
  beforeEach(function() {
    driverForAnalyzer = new DriverForAnalyzer();
  });
  
  it("Limpiar un string CON caracteres especiales ", function() {
    var initialData = String.fromCharCode(2) + "H|\\^&|||EPOC^Blood Analysis^EDM^Data Manager|||||||P||201645102825" + String.fromCharCode(3);
    var newData = driverForAnalyzer.cleanSpecialCharacters(initialData);
    var cleanData = "H|\\^&|||EPOC^Blood Analysis^EDM^Data Manager|||||||P||201645102825";
    
    expect(newData).toEqual(cleanData);
  });

  it("Limpiar un string SIN caracteres especiales ", function() {
    var initialData = "H|\\^&|||EPOC^Blood Analysis^EDM^Data Manager|||||||P||201645102825";
    var newData = driverForAnalyzer.cleanSpecialCharacters(initialData);

    expect(newData).toEqual(initialData);
  });
  
  
});