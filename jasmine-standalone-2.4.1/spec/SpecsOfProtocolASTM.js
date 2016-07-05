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
  
  it( "Obtener la data del Header despúes de modificada", function() {
    var header = new HeaderASTM();
    var recordHeaderModified = "";
    
    header.setSenderID( "AnalyzerTesting^Blood Analysis^AnalyzerSystem^Data Manager" );
    recordHeaderModified = header.getDataModified();

    expect(recordHeaderModified).toEqual("H|\\^&|||" + header.getSenderID() + "|||||||||");
  });

  it( "Obtener el protocolo completo del Paciente", function() {
    var arrayProtocol = [];
    var readStatus = false;

    // Leer la Data
    readStatus =  protocolASTM.readInputData("H|\\^&|||EPOC^Blood Analysis^EDM^Data Manager|||||||P||201645102825")
                  && protocolASTM.readInputData("P|1|A1E18155MHE|||||||||||||||||||||20160405102825|||||||||||")
                  && protocolASTM.readInputData("C|1|L|COMENTARIO DEL PACIENTE 1|")
                  && protocolASTM.readInputData("C|2|L|COMENTARIO DEL PACIENTE 2|")
                  && protocolASTM.readInputData("O|1|A1E18155MHE||ALL|R|20160405082748|20160405082748||||X||||1||||||||||F")
                  && protocolASTM.readInputData("C|1|L|COMENTARIO DE LA ORDEN 1|")
                  && protocolASTM.readInputData("C|2|L|COMENTARIO DE LA ORDEN 2|")
                  && protocolASTM.readInputData("R|1|^^^Hct^^^^323.1|47|%||N||F||^dinamica||20160405082748|323.1")
                  && protocolASTM.readInputData("C|1|L|COMENTARIO DEL RESULTADO 1.1|")
                  && protocolASTM.readInputData("C|2|L|COMENTARIO DEL RESULTADO 1.2|")
                  && protocolASTM.readInputData("R|2|^^^Na+^^^^323.1|135|mmol/L||L||F||^dinamica||20160405082748|323.1")
                  && protocolASTM.readInputData("C|1|L|COMENTARIO DEL RESULTADO 2.1|")
                  && protocolASTM.readInputData("C|2|L|COMENTARIO DEL RESULTADO 2.2|")
                  && protocolASTM.readInputData("R|3|^^^K+^^^^323.1|3.2|mmol/L||L||F||^dinamica||20160405082748|323.1")
                  && protocolASTM.readInputData("R|4|^^^Ca++^^^^323.1|1.04|mmol/L||L||F||^dinamica||20160405082748|323.1")
                  && protocolASTM.readInputData("R|5|^^^pH^^^^323.1|7.467|||H||F||^dinamica||20160405082748|323.1")
                  && protocolASTM.readInputData("R|6|^^^pCO2^^^^323.1|33.8|mmHg||L||F||^dinamica||20160405082748|323.1")
                  && protocolASTM.readInputData("R|7|^^^pO2^^^^323.1|39.0|mmHg||L||F||^dinamica||20160405082748|323.1")
                  && protocolASTM.readInputData("R|8|^^^Glu^^^^323.1|116|mg/dL||H||F||^dinamica||20160405082748|323.1")
                  && protocolASTM.readInputData("R|9|^^^Lact^^^^323.1|2.32|mmol/L||H||F||^dinamica||20160405082748|323.1")
                  && protocolASTM.readInputData("R|10|^^^cHgb^^^^323.1|16.0|g/dL||N||F||^dinamica||20160405082748|323.1")
                  && protocolASTM.readInputData("R|11|^^^HCO3-act^^^^323.1|24.4|mmol/L||N||F||^dinamica||20160405082748|323.1")
                  && protocolASTM.readInputData("R|12|^^^cTCO2^^^^323.1|25.4|mmol/L||N||F||^dinamica||20160405082748|323.1")
                  && protocolASTM.readInputData("R|13|^^^BE(ecf)^^^^323.1|0.7|mmol/L||N||F||^dinamica||20160405082748|323.1")
                  && protocolASTM.readInputData("R|14|^^^BE(b)^^^^323.1|1.3|mmol/L||N||F||^dinamica||20160405082748|323.1")
                  && protocolASTM.readInputData("R|15|^^^O2SAT^^^^323.1|77.6|%||L||F||^dinamica||20160405082748|323.1")
                  && protocolASTM.readInputData("R|16|^^^Test duration^^^^323.1|239.6|||N||F||^dinamica||20160405082748|323.1")
                  && protocolASTM.readInputData("R|17|^^^Department name^^^^323.1|Default|||N||F||^dinamica||20160405082748|323.1")
                  && protocolASTM.readInputData("R|18|^^^Sample type^^^^323.1|Unspecified|||N||F||^dinamica||20160405082748|323.1")
                  && protocolASTM.readInputData("R|19|^^^Hemodilution^^^^323.1|No|||N||F||^dinamica||20160405082748|323.1")
                  && protocolASTM.readInputData("R|20|^^^ReaderMaintenanceRequired^^^^323.1|No|||N||F||^dinamica||20160405082748|323.1")
                  && protocolASTM.readInputData("R|21|^^^Bubble width^^^^323.1|0.65|||N||F||^dinamica||20160405082748|323.1")
                  && protocolASTM.readInputData("R|22|^^^Ambient Temperature^^^^323.1|21.6|C||N||F||^dinamica||20160405082748|323.1")
                  && protocolASTM.readInputData("R|23|^^^Ambient Pressure^^^^323.1|643.1|mmHg||N||F||^dinamica||20160405082748|323.1")
                  && protocolASTM.readInputData("R|24|^^^Patient Id entry method^^^^323.1|2|||N||F||^dinamica||20160405082748|323.1")
                  && protocolASTM.readInputData("R|25|^^^Patient Id lookup code^^^^323.1|6|||N||F||^dinamica||20160405082748|323.1")
                  && protocolASTM.readInputData("R|26|^^^eQC time^^^^323.1|05-Apr-16 08:24:19|||N||F||^dinamica||20160405082748|323.1")
                  && protocolASTM.readInputData("R|27|^^^eVAD version^^^^323.1|NotAvailable|||N||F||^dinamica||20160405082748|323.1")
                  && protocolASTM.readInputData("R|28|^^^EDM Test status^^^^323.1|Success|||N||F||^dinamica||20160405082748|323.1")
                  && protocolASTM.readInputData("R|29|^^^Criticals present^^^^323.1|No|||N||F||^dinamica||20160405082748|323.1")
                  && protocolASTM.readInputData("R|30|^^^EnforceCriticalHandling^^^^323.1|Yes|||N||F||^dinamica||20160405082748|323.1")
                  && protocolASTM.readInputData("R|31|^^^Host mode^^^^323.1|0|||N||F||^dinamica||20160405082748|323.1")
                  && protocolASTM.readInputData("R|32|^^^QCScheduleState^^^^323.1|0|||N||F||^dinamica||20160405082748|323.1")
                  && protocolASTM.readInputData("R|33|^^^CVScheduleState^^^^323.1|0|||N||F||^dinamica||20160405082748|323.1")
                  && protocolASTM.readInputData("R|34|^^^TQAScheduleState^^^^323.1|0|||N||F||^dinamica||20160405082748|323.1")
                  && protocolASTM.readInputData("R|35|^^^QAScheduleState^^^^323.1|0|||N||F||^dinamica||20160405082748|323.1")
                  && protocolASTM.readInputData("R|36|^^^Card Lot^^^^323.1|07-15313-30|||N||F||^dinamica||20160405082748|323.1")
                  && protocolASTM.readInputData("R|37|^^^Card Expiration Date^^^^323.1|20160425|||N||F||^dinamica||20160405082748|323.1")
                  && protocolASTM.readInputData("R|38|^^^HostSerNum^^^^323.1|15065521400740|||N||F||^dinamica||20160405082748|323.1")
                  && protocolASTM.readInputData("R|39|^^^Host Alias^^^^323.1|15065521400740|||N||F||^dinamica||20160405082748|323.1")
                  && protocolASTM.readInputData("R|40|^^^ReaderSerNum^^^^323.1|11716|||N||F||^dinamica||20160405082748|323.1")
                  && protocolASTM.readInputData("R|41|^^^Reader Alias^^^^323.1|Rdr11716|||N||F||^dinamica||20160405082748|323.1")
                  && protocolASTM.readInputData("L|1|N");

                  
    //debugger;              
    
    // Obtener un array con el protocolo completo del paciente
    if(readStatus)
      arrayProtocol = protocolASTM.getArrayWithFullPatientProtocol();
    
    expect(arrayProtocol[0]).toEqual("H|\\^&|||EPOC^Blood Analysis^EDM^Data Manager|||||||P||201645102825");
    expect(arrayProtocol[1]).toEqual("P|1|A1E18155MHE|||||||||||||||||||||20160405102825|||||||||||");
    expect(arrayProtocol[2]).toEqual("C|1|L|COMENTARIO DEL PACIENTE 1|");
    expect(arrayProtocol[3]).toEqual("C|2|L|COMENTARIO DEL PACIENTE 2|");
    expect(arrayProtocol[4]).toEqual("O|1|A1E18155MHE||ALL|R|20160405082748|20160405082748||||X||||1||||||||||F");
    expect(arrayProtocol[5]).toEqual("C|1|L|COMENTARIO DE LA ORDEN 1|");
    expect(arrayProtocol[6]).toEqual("C|2|L|COMENTARIO DE LA ORDEN 2|");
    expect(arrayProtocol[7]).toEqual("R|1|^^^Hct^^^^323.1|47|%||N||F||^dinamica||20160405082748|323.1");
    expect(arrayProtocol[8]).toEqual("C|1|L|COMENTARIO DEL RESULTADO 1.1|");
    expect(arrayProtocol[9]).toEqual("C|2|L|COMENTARIO DEL RESULTADO 1.2|");
    expect(arrayProtocol[10]).toEqual("R|2|^^^Na+^^^^323.1|135|mmol/L||L||F||^dinamica||20160405082748|323.1");
    expect(arrayProtocol[11]).toEqual("C|1|L|COMENTARIO DEL RESULTADO 2.1|");
    expect(arrayProtocol[12]).toEqual("C|2|L|COMENTARIO DEL RESULTADO 2.2|");
    expect(arrayProtocol[13]).toEqual("R|3|^^^K+^^^^323.1|3.2|mmol/L||L||F||^dinamica||20160405082748|323.1");
    expect(arrayProtocol[14]).toEqual("R|4|^^^Ca++^^^^323.1|1.04|mmol/L||L||F||^dinamica||20160405082748|323.1");
    expect(arrayProtocol[15]).toEqual("R|5|^^^pH^^^^323.1|7.467|||H||F||^dinamica||20160405082748|323.1");
    expect(arrayProtocol[16]).toEqual("R|6|^^^pCO2^^^^323.1|33.8|mmHg||L||F||^dinamica||20160405082748|323.1");
    expect(arrayProtocol[17]).toEqual("R|7|^^^pO2^^^^323.1|39.0|mmHg||L||F||^dinamica||20160405082748|323.1");
    expect(arrayProtocol[18]).toEqual("R|8|^^^Glu^^^^323.1|116|mg/dL||H||F||^dinamica||20160405082748|323.1");
    expect(arrayProtocol[19]).toEqual("R|9|^^^Lact^^^^323.1|2.32|mmol/L||H||F||^dinamica||20160405082748|323.1");
    expect(arrayProtocol[20]).toEqual("R|10|^^^cHgb^^^^323.1|16.0|g/dL||N||F||^dinamica||20160405082748|323.1");
    expect(arrayProtocol[21]).toEqual("R|11|^^^HCO3-act^^^^323.1|24.4|mmol/L||N||F||^dinamica||20160405082748|323.1");
    expect(arrayProtocol[22]).toEqual("R|12|^^^cTCO2^^^^323.1|25.4|mmol/L||N||F||^dinamica||20160405082748|323.1");
    expect(arrayProtocol[23]).toEqual("R|13|^^^BE(ecf)^^^^323.1|0.7|mmol/L||N||F||^dinamica||20160405082748|323.1");
    expect(arrayProtocol[24]).toEqual("R|14|^^^BE(b)^^^^323.1|1.3|mmol/L||N||F||^dinamica||20160405082748|323.1");
    expect(arrayProtocol[25]).toEqual("R|15|^^^O2SAT^^^^323.1|77.6|%||L||F||^dinamica||20160405082748|323.1");
    expect(arrayProtocol[26]).toEqual("R|16|^^^Test duration^^^^323.1|239.6|||N||F||^dinamica||20160405082748|323.1");
    expect(arrayProtocol[27]).toEqual("R|17|^^^Department name^^^^323.1|Default|||N||F||^dinamica||20160405082748|323.1");
    expect(arrayProtocol[28]).toEqual("R|18|^^^Sample type^^^^323.1|Unspecified|||N||F||^dinamica||20160405082748|323.1");
    expect(arrayProtocol[29]).toEqual("R|19|^^^Hemodilution^^^^323.1|No|||N||F||^dinamica||20160405082748|323.1");
    expect(arrayProtocol[30]).toEqual("R|20|^^^ReaderMaintenanceRequired^^^^323.1|No|||N||F||^dinamica||20160405082748|323.1");
    expect(arrayProtocol[31]).toEqual("R|21|^^^Bubble width^^^^323.1|0.65|||N||F||^dinamica||20160405082748|323.1");
    expect(arrayProtocol[32]).toEqual("R|22|^^^Ambient Temperature^^^^323.1|21.6|C||N||F||^dinamica||20160405082748|323.1");
    expect(arrayProtocol[33]).toEqual("R|23|^^^Ambient Pressure^^^^323.1|643.1|mmHg||N||F||^dinamica||20160405082748|323.1");
    expect(arrayProtocol[34]).toEqual("R|24|^^^Patient Id entry method^^^^323.1|2|||N||F||^dinamica||20160405082748|323.1");
    expect(arrayProtocol[35]).toEqual("R|25|^^^Patient Id lookup code^^^^323.1|6|||N||F||^dinamica||20160405082748|323.1");
    expect(arrayProtocol[36]).toEqual("R|26|^^^eQC time^^^^323.1|05-Apr-16 08:24:19|||N||F||^dinamica||20160405082748|323.1");
    expect(arrayProtocol[37]).toEqual("R|27|^^^eVAD version^^^^323.1|NotAvailable|||N||F||^dinamica||20160405082748|323.1");
    expect(arrayProtocol[38]).toEqual("R|28|^^^EDM Test status^^^^323.1|Success|||N||F||^dinamica||20160405082748|323.1");
    expect(arrayProtocol[39]).toEqual("R|29|^^^Criticals present^^^^323.1|No|||N||F||^dinamica||20160405082748|323.1");
    expect(arrayProtocol[40]).toEqual("R|30|^^^EnforceCriticalHandling^^^^323.1|Yes|||N||F||^dinamica||20160405082748|323.1");
    expect(arrayProtocol[41]).toEqual("R|31|^^^Host mode^^^^323.1|0|||N||F||^dinamica||20160405082748|323.1");
    expect(arrayProtocol[42]).toEqual("R|32|^^^QCScheduleState^^^^323.1|0|||N||F||^dinamica||20160405082748|323.1");
    expect(arrayProtocol[43]).toEqual("R|33|^^^CVScheduleState^^^^323.1|0|||N||F||^dinamica||20160405082748|323.1");
    expect(arrayProtocol[44]).toEqual("R|34|^^^TQAScheduleState^^^^323.1|0|||N||F||^dinamica||20160405082748|323.1");
    expect(arrayProtocol[45]).toEqual("R|35|^^^QAScheduleState^^^^323.1|0|||N||F||^dinamica||20160405082748|323.1");
    expect(arrayProtocol[46]).toEqual("R|36|^^^Card Lot^^^^323.1|07-15313-30|||N||F||^dinamica||20160405082748|323.1");
    expect(arrayProtocol[47]).toEqual("R|37|^^^Card Expiration Date^^^^323.1|20160425|||N||F||^dinamica||20160405082748|323.1");
    expect(arrayProtocol[48]).toEqual("R|38|^^^HostSerNum^^^^323.1|15065521400740|||N||F||^dinamica||20160405082748|323.1");
    expect(arrayProtocol[49]).toEqual("R|39|^^^Host Alias^^^^323.1|15065521400740|||N||F||^dinamica||20160405082748|323.1");
    expect(arrayProtocol[50]).toEqual("R|40|^^^ReaderSerNum^^^^323.1|11716|||N||F||^dinamica||20160405082748|323.1");
    expect(arrayProtocol[51]).toEqual("R|41|^^^Reader Alias^^^^323.1|Rdr11716|||N||F||^dinamica||20160405082748|323.1");
    expect(arrayProtocol[52]).toEqual("L|1|N");
    
  });

});