function InstrumentDB() {
  // Objeto indexedDB
  var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
 
  // Prefijos de los objetos window.IDB
  var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
  var IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
   
  if (!indexedDB) {
      console.log("Su navegador no es compatible con una versión estable de IndexedDB.");
  }
  
  // Declarar variables locales
  var instrument  = this;
  // Abrir/Crear la base de datos con un versionamiento
  var request = instrument.getRequestDB();
  // Definir las variables locales
  var dbConnection;

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
    
    // Crear/modificar objeto de almacenamiento Resultados del Instrumento
    instrument.createInstrumentResult_OS(event);
    
  };

  // Obtener el objeto de conexión a la base de datos
  this.getDBConnection = function() {
    return dbConnection;
  };
}

InstrumentDB.prototype.getRequestDB = function() {
  var version = 1;
  return indexedDB.open("InstrumentDB", version);
};

InstrumentDB.prototype.createInstrumentResult_OS = function(event) {
  // Instanciar el DTO del objeto de almacenamiento
  var osResult = new InstrumentResultDTO();
  // event es una instancia de IDBVersionChangeEvent
  var idb = event.target.result;
  if (idb.objectStoreNames.contains(osResult.getStoreName()))
  {
    // Eliminar objeto de almacenamiento
    idb.deleteObjectStore(osResult.getStoreName());
  }    
  // Crear objeto de almacenamiento
  var objectStore = idb.createObjectStore(osResult.getStoreName(), {keyPath: "idtrama", autoIncrement: true});
  // Crear un indice
  objectStore.createIndex('by_id', 'id', {unique: false});  
};

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


// Objeto Instrumento tipo Data Access Object (DAO, Objeto de Acceso a Datos)
function InstrumentDAO() {
  this.getDBConnection = function() {
    return instrumentDB.getRequestDB();
  };
}

// Método DAO para crear resultados del Instrumento
InstrumentDAO.prototype.createResult = function(osResult) {
  // Abrir la conexión a la base de datos
  var request = this.getDBConnection();
  request.onsuccess = function(e)
  {
    var dbConnection = e.target.result;
    var requestAdd = dbConnection.transaction([osResult.getStoreName()], "readwrite")
            .objectStore(osResult.getStoreName())
            .add(osResult.getFields());
    requestAdd.onsuccess = function(e) {
      console.log("Resultado creado en la base de datos");
    };
     
    requestAdd.onerror = function(e) {
      console.log("Error al crear un resultado en la base de datos");
    };
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


// Objeto Instrumento tipo Business Logic (BL)
function InstrumentBL() {
  // Instanciar el DAO del objeto Instrumento
  var instrumentDAO = new InstrumentDAO();
  
  this.getInstrumentDAO = function() {
    return instrumentDAO;
  };
}

// Método BL para crear resultados del Instrumento
InstrumentBL.prototype.createResult = function( resultDTO ) {
  // Crear el resultado
  this.getInstrumentDAO().createResult( resultDTO );
};
