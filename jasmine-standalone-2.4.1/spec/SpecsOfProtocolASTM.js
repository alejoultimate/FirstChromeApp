describe( "ProtocolASTM", function() {
  var protocolASTM;
  
  beforeEach( function() {
    protocolASTM = new ProtocolASTM();
  });

  it( "Comprobar un registro ASTM válido", function() {
    var data = "H|\\^&|||EPOC^Blood Analysis^EDM^Data Manager|||||||P||201645102825";
    var isValidFormat = protocolASTM.isValidFormat(data);
    
    expect(isValidFormat).toEqual(true);
  });

});