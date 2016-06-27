describe( "FileManager", function() {
  var fileManager;
  
  beforeEach( function() {
    fileManager = new FileManager();
  });
  
  it( "Separar el nombre del directorio 'Log' y el nombre del archivo plano 'LogSerialPortToASTM.txt'", function() {
    var result = fileManager.splitByFileName("/Log/LogSerialPortToASTM.txt");
    expect( result.directoryPath ).toEqual( "/Log" );
    expect( result.fileName ).toEqual( "LogSerialPortToASTM.txt" );
  });
  

  it( "Separar el nombre del directorio 'tmp' y el nombre del archivo plano 'LogTemporal.txt'", function() {
    var result = fileManager.splitByFileName("/tmp/LogTemporal.txt");
    expect( result.directoryPath ).toEqual( "/tmp" );
    expect( result.fileName ).toEqual( "LogTemporal.txt" );
  });
  
  
  
});