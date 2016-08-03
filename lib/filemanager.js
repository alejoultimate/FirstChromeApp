function FileManager() {
  window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
  var directoryPath = "";
  var fileName = "";
  
  this.getDirectoryPath = function() {
    return this.directoryPath;
  };
  
  this.setDirectoryPath = function(value) {
    this.directoryPath = value;
  };
  
  this.getFileName = function() {
    return this.fileName;
  };
  
  this.setFileName = function(value) {
    this.fileName = value;
  };
  
}


FileManager.prototype.errorCallback = function() {
    console.log('Error: ' + e.name);
};


FileManager.prototype.splitByFileName = function(fullFileName) {
    var nOffset = Math.max(0, Math.max(fullFileName.lastIndexOf('\\'), fullFileName.lastIndexOf('/')));
    return {directoryPath: fullFileName.substring(0, nOffset),
            fileName: fullFileName.split(/(\\|\/)/g).pop()};
};


FileManager.prototype.writeToLocal = function(fullFileName, arr) {
  // Separar el directorio y el nombre del archivo
  var file = this.splitByFileName(fullFileName);
  window.requestFileSystem(window.PERSISTENT, 1024*1024, function(fs) {
    console.log(fs);
    fs.root.getDirectory(file.directoryPath, {create: true}, function(dirEntry) {
      console.log(dirEntry);
      dirEntry.getFile(file.fileName, {create: true, exclusive: false}, function(fileEntry) {
        console.log(fileEntry);
        fileEntry.createWriter(function(fileWriter) {
          console.log(fileWriter);
  
          var blob = new Blob(arr);
  
          fileWriter.addEventListener("writeend", function() {
               console.log('Write completed.');
          }, false);
          
          // Start write position at EOF.
          fileWriter.seek(fileWriter.length);
          // Create a new Blob and write it to log
          fileWriter.write(blob);
        }, this.errorCallback );
      }, this.errorCallback );
    }, this.errorCallback );
  }, this.errorCallback );
};

