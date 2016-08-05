function InstrumentDB() {
  // Objeto indexedDB
  var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
 
  // Prefijos de los objetos window.IDB
  var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
  var IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
   
  if (!indexedDB) {
      console.log("Your browser doesn't support a stable version of IndexedDB.");
  }
  
  // Abrir/Crear la base de datos con un versionamiento
  var request = indexedDB.open("InstrumentDB", 1);
  
  // Definir las variables locales
  var dbConnection;
  var results = [];

  // Evento que se ejecuta cuando ocurre un error al abrir/crear la base de datos
  request.onerror = function(e) {
    console.log("error: ", e);
  };
   
  // Evento que se ejecuta al abrir/crear satisfactoriamente la base de datos
  request.onsuccess = function(e) {
    dbConnection = request.result;
    console.log("success: "+ dbConnection);
  };
  
  // Evento que se ejecuta solo cuando hay un cambio de versionamiento de la base de datos
  request.onupgradeneeded = function(event) {
    
    var osResult = new InstrumentResultDTO();
    osResult.setID("1");
    osResult.setTrama("ASTM");
    results.push(osResult.getFields());

    var osResult2 = new InstrumentResultDTO();
    osResult2.setID("2");
    osResult2.setTrama("HL7");
    results.push(osResult2.getFields());

    
    var objectStore = event.target.result.createObjectStore(osResult.getStoreName(), {keyPath: "id"});
    for (var i in results) {
      objectStore.add(results[i]);      
    }
    
  };

  this.getDBConnection = function() {
    return dbConnection;
  };
}

// Crear/Abrir la base de datos
var instrumentDB = new InstrumentDB();

// Objeto DTO Resultados del Instrumento
function InstrumentResultDTO() {
  var storeName = "results";
  var fields = { id: "", trama: "" };
  
  this.getStoreName = function() {
    return storeName;
  };
  
  this.setStoreName = function(value) {
    storeName = value;
  };
  
  this.getID = function() {
    return fields.id;
  };
  
  this.setID = function(value) {
    fields.id = value;
  };
  
  this.getTrama = function() {
    return fields.trama;
  };
  
  this.setTrama = function(value) {
    fields.trama = value;
  };
  
  this.getFields = function() {
    return fields;
  };
}


function InstrumentDAO(db) {
  var dbConnection = db.getDBConnection();

  this.getDBConnection = function() {
    return dbConnection;
  };
}

InstrumentDAO.prototype.createResult = function(osResult) {
  var dbConnection = this.getDBConnection();

  var request = dbConnection.transaction([osResult.getStoreName()], "readwrite")
          .objectStore(osResult.getStoreName())
          .add(osResult.getFields());
                           
  request.onsuccess = function(e) {
    console.log("Resultado creado en la base de datos");
  };
   
  request.onerror = function(e) {
    console.log("Error al crear un resultado en la base de datos");
  };
         
};


InstrumentDAO.prototype.readResult = function() {
        var objectStore = db.transaction("users").objectStore("users");
        var request = objectStore.get("2");
        request.onerror = function(event) {
          console.log("Unable to retrieve data from database!");
        };
        request.onsuccess = function(event) {          
          if(request.result) {
                console.log("Name: " + request.result.name + ", Age: " + request.result.age + ", Email: " + request.result.email);
          } else {
                console.log("Bidulata couldn't be found in your database!"); 
          }
        };
};

InstrumentDAO.prototype.readAllResults = function() {
        var objectStore = db.transaction("users").objectStore("users");  
        var req = objectStore.openCursor();

        req.onsuccess = function(event) {
      db.close();
          var res = event.target.result;
          if (res) {
                console.log("Key " + res.key + " is " + res.value.name + ", Age: " + res.value.age + ", Email: " + res.value.email);
                res.continue();
          }
        }; 

        req.onerror = function (e) {
            console.log("Error Getting: ", e);
        };    
};

InstrumentDAO.prototype.deleteResult = function() { 
        var request = db.transaction(["users"], "readwrite").objectStore("users").delete("1");
        request.onsuccess = function(event) {
          console.log("Tapas's entry has been removed from your database.");
        };
};


function InstrumentBL() {
  // Instanciar el DAO del objeto Instrumento
  var instrumentDAO = new InstrumentDAO(instrumentDB);
  
  this.getInstrumentDAO = function() {
    return instrumentDAO;
  };
}

InstrumentBL.prototype.createResult = function( result ) {
  this.getInstrumentDAO().createResult( result );
};
