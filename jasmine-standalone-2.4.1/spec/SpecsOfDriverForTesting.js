describe("DriverForTesting", function() {
  var driverForTesting;
  
  beforeEach(function() {
    driverForTesting = new DriverForTesting();
  });
  
  it("Convertir un dato a un Header ASTM válido", function() {
    var initialData = "esto es un Header";
    var dataWithEnter = initialData + String.fromCharCode(10);
    var newData = driverForTesting.convertDataToHeaderASTM(dataWithEnter);

    expect(initialData).not.toEqual(newData);
    expect(newData).toEqual("H|\\^&|||" + initialData + "|||||||||" + String.fromCharCode(10));
  });

});