describe( "ProtocolASTM", function() {
  var protocolASTM;
  
  beforeEach( function() {
    protocolASTM = new ProtocolASTM();
  });

  it( "Comprobar un registro Header ASTM válido", function() {
    var data = "H|\\^&|||EPOC^Blood Analysis^EDM^Data Manager|||||||P||201645102825";
    var isValidFormat = protocolASTM.isValidRecord(data);
    
    expect(isValidFormat).toEqual(true);
  });
  
  it( "Comprobar un registro Patient ASTM válido", function() {
    var data = "P|1|A1E18155MHE|||||||||||||||||||||20160405102825|||||||||||";
    var isValidFormat = protocolASTM.isValidRecord(data);
    
    expect(isValidFormat).toEqual(true);
  });

  it( "Comprobar un registro Order ASTM válido", function() {
    var data = "O|1|1000760087||ALL|R|20160323205127|20160323205127||||X||||1||||||||||F";
    var isValidFormat = protocolASTM.isValidRecord(data);
    
    expect(isValidFormat).toEqual(true);
  });

  it( "Comprobar un registro Result ASTM válido", function() {
    var data = "R|1|^^^Hct^^^^323.1|40|%||N||F||^dinamica||20160323205127|323.1";
    var isValidFormat = protocolASTM.isValidRecord(data);
    
    expect(isValidFormat).toEqual(true);
  });
  
  it( "Comprobar un registro Query ASTM válido", function() {
    var data = "Q|1|^15200049\\15200059\\15200043\\15200073\\15200013||^^^CT/NG^^Full||||||||";
    var isValidFormat = protocolASTM.isValidRecord(data);
    
    expect(isValidFormat).toEqual(true);
  });
  
  it( "Comprobar un registro Comment ASTM válido", function() {
    var data = "C|1|L|COMENTARIO DEL PACIENTE 1|";
    var isValidFormat = protocolASTM.isValidRecord(data);
    
    expect(isValidFormat).toEqual(true);
  });

  it( "Comprobar un registro Final Record ASTM válido", function() {
    var data = "L|1|N";
    var isValidFormat = protocolASTM.isValidRecord(data);
    
    expect(isValidFormat).toEqual(true);
  });

  it( "Comprobar un registro que NO es un ASTM válido", function() {
    var data = "esto es una prueba";
    var isValidFormat = protocolASTM.isValidRecord(data);
    
    expect(isValidFormat).toEqual(false);
  });


});