function FieldsASTM () {
  this.key = "";
  this.value = "";
}


function RecordASTM () {
  this.level = 0;
  this.typeIdentifier = "";
  this.fields = [];
}


RecordASTM.prototype.isValidIdentifier = function (id) {
  if (this.typeIdentifier === id)
    return true;
  return false;
};

RecordASTM.prototype.isValidFieldsNumber = function (fields) {
  if (fields.length === this.numberFieldsValid)
    return true;
  return false;
};

RecordASTM.prototype.isValidRecord = function (data, fields) {
  var id = data.substr(0, 1);
  if (this.isValidIdentifier(id) && this.isValidFieldsNumber(fields))
    return true;
  return false;
};

RecordASTM.prototype.createRecord = function (data, fields) {
  if (this.isValidRecord(data, fields)) {
    this.fields = fields;
    return true;
  }
  return false;
};

// Header ASTM
function HeaderASTM () {
  var data = "";
  this.level = 0;
  this.typeIdentifier = "H";
  var items = {
    recordTypeID: "H",
    delimiterDefinition: "\\^&",
    messageControl: "",
    password: "",
    senderID: "",
    senderStreetAddr: "",
    reservedField: "",
    senderTelNumber: "",
    characteristicsOfSender: "",
    receiverID: "",
    commentOrSpecialInstructions: "",
    processingID: "",
    versionNumber: "",
    dateAndTime: ""
  };
  var patients = [];
  this.comments = [];
  this.numberFieldsValid = 14;
  
  this.getItems = function() {
    return items;
  };
  
  this.getRecordModified = function(item) {
    var recordModified =  [ item.recordTypeID,
                            item.delimiterDefinition,
                            item.messageControl,
                            item.password,
                            item.senderID,
                            item.senderStreetAddr,
                            item.reservedField,
                            item.senderTelNumber,
                            item.characteristicsOfSender,
                            item.receiverID,
                            item.commentOrSpecialInstructions,
                            item.processingID,
                            item.versionNumber,
                            item.dateAndTime
                          ].join("|");
    return recordModified;
  };
  
  this.setSenderID = function(value) {
    items.senderID = value;
  };
  
  this.getDataModified = function() {
    var arrayItems = [];
    arrayItems[0] = this.getItems();
    var recordStringModified = arrayItems.map(this.getRecordModified);
    data = recordStringModified[0];
    return data;
  };
  
  this.getSenderID = function() {
    return items.senderID;
  };
  
  this.getPatients = function() {
    return patients;
  };
  
  this.setPatients = function(value) {
    patients = value;
  };
  
  this.getPatient = function(index) {
    return patients[index];
  };

  this.getData = function() {
      return data;
  };

  this.setData = function(value) {
    data = value;
  };
}

// inherits From RecordASTM
HeaderASTM.prototype = new RecordASTM();

// Create Record
HeaderASTM.prototype.createRecord = function (data, fields) {
  if (RecordASTM.prototype.createRecord.call(this, data, fields)) {
    this.setData(data);
    return true;
  }
  return false;
};



// Patient ASTM
function PatientASTM () {
  var data = "";
  this.level = 1;
  this.typeIdentifier = "P";
  var items = {
    recordTypeID: "P",
    sequenceNumber: "",
    practicePatientID: "",
    labPatientID: "",
    patientIDNo_3: "",
    patientName: "",
    motherIsMaidenName: "",
    birthdate: "",
    patientSex: "",
    patientRaceEthnicOrigin: "",
    patientAddress: "",
    reservedField: "",
    patientTelephoneNumber: "",
    attendingPhysicianID: "",
    specialField1: "",
    specialField2: "",
    patientHeight: "",
    patientWeight: "",
    diagnose: "",
    patientActiveMedications: "",
    patientIsDiet: "",
    praticeFieldNo_1: "",
    practiceFieldNo_2: "",
    registeredDateandTime: "",
    admissionStatus: "",
    location: "",
    natureOfAlternDiagnCodeAndClassif: "",
    AlternDiagnCodeandClassif: "",
    patientReligion: "",
    maritalStatus: "",
    isolationStatus: "",
    language: "",
    area: "",
    hospitalInstitution: "",
    dosageCategory: ""
  };
  var orders = [];
  this.queries = [];
  var comments = [];
  this.numberFieldsValid = 35;
  
  this.getData = function() {
      return data;
  };

  this.setData = function(value) {
    data = value;
  };
  
  this.getComments = function() {
    return comments;
  };
  
  this.getComment = function(index) {
    return comments[index];
  };
  
  this.getOrders = function() {
    return orders;
  };
  
  this.getOrder = function(index) {
    return orders[index];
  };
  
  this.setSampleID = function(value) {
    items.practicePatientID = value;
  };
  
  this.getItems = function() {
    return items;
  };

  this.getRecordModified = function(item) {
    var recordModified =  [ item.recordTypeID,
                            item.sequenceNumber,
                            item.practicePatientID,
                            item.labPatientID,
                            item.patientIDNo_3,
                            item.patientName,
                            item.motherIsMaidenName,
                            item.birthdate,
                            item.patientSex,
                            item.patientRaceEthnicOrigin,
                            item.patientAddress,
                            item.reservedField,
                            item.patientTelephoneNumber,
                            item.attendingPhysicianID,
                            item.specialField1,
                            item.specialField2,
                            item.patientHeight,
                            item.patientWeight,
                            item.diagnose,
                            item.patientActiveMedications,
                            item.patientIsDiet,
                            item.praticeFieldNo_1,
                            item.practiceFieldNo_2,
                            item.registeredDateandTime,
                            item.admissionStatus,
                            item.location,
                            item.natureOfAlternDiagnCodeAndClassif,
                            item.AlternDiagnCodeandClassif,
                            item.patientReligion,
                            item.maritalStatus,
                            item.isolationStatus,
                            item.language,
                            item.area,
                            item.hospitalInstitution,
                            item.dosageCategory
                          ].join("|");
    return recordModified;
  };
  
  this.getDataModified = function() {
    var arrayItems = [];
    arrayItems[0] = this.getItems();
    var recordStringModified = arrayItems.map(this.getRecordModified);
    data = recordStringModified[0];
    return data;
  };
}

// inherits From RecordASTM
PatientASTM.prototype = new RecordASTM();

// Create Record
PatientASTM.prototype.createRecord = function (data, fields) {
  if (RecordASTM.prototype.createRecord.call(this, data, fields)) {
    this.setData(data);
    return true;
  }
  return false;
};


// Order ASTM
function OrderASTM () {
  var data = "";
  this.level = 2;
  this.typeIdentifier = "O";
  var items = [ recordTypeID = "O",
                sequenceNumber = "",
                sampleID = "",
                position = "",
                universalTestID = "",
                priority = "",
                requestedDateAndTime = "",
                specimenCollectionDateAndTime = "",
                collectionEndTime = "",
                collectionVolume = "",
                collectorID = "",
                actionCode = "",
                dangerCode = "",
                relevantClinicalInformation = "",
                dateTimeSpecimenReceived = "",
                specimenDescriptor = "",
                OrderingPhysician = "",
                physicianIsTelephoneNumber = "",
                userLoginSignature = "",
                UsersFieldNo_2 = "",
                specimenQuality = "",
                rerunFlag = "",
                dateTimeResults = "",
                instrumentChargeToPCSystem = "",
                instrumentCode = "",
                reportType = ""
              ];
  var results = [];
  var comments = [];
  this.numberFieldsValid = 26;

  this.getData = function() {
      return data;
  };

  this.setData = function(value) {
    data = value;
  };

  this.getComments = function() {
    return comments;
  };
  
  this.getComment = function(index) {
    return comments[index];
  };

  this.getResults = function() {
    return results;
  };
  
  this.getResult = function(index) {
    return results[index];
  };
  
  this.setSampleID = function(value) {
    items.sampleID = value;
  };
  
  this.getItems = function() {
    return items;
  };

  this.getRecordModified = function(item) {
    var recordModified =  [ item.recordTypeID,
                            item.sequenceNumber,
                            item.sampleID,
                            item.position,
                            item.universalTestID,
                            item.priority,
                            item.requestedDateAndTime,
                            item.specimenCollectionDateAndTime,
                            item.collectionEndTime,
                            item.collectionVolume,
                            item.collectorID,
                            item.actionCode,
                            item.dangerCode,
                            item.relevantClinicalInformation,
                            item.dateTimeSpecimenReceived,
                            item.specimenDescriptor,
                            item.OrderingPhysician,
                            item.physicianIsTelephoneNumber,
                            item.userLoginSignature,
                            item.UsersFieldNo_2,
                            item.specimenQuality,
                            item.rerunFlag,
                            item.dateTimeResults,
                            item.instrumentChargeToPCSystem,
                            item.instrumentCode,
                            item.reportType
                          ].join("|");
    return recordModified;
  };
  
  this.getDataModified = function() {
    var arrayItems = [];
    arrayItems[0] = this.getItems();
    var recordStringModified = arrayItems.map(this.getRecordModified);
    data = recordStringModified[0];
    return data;
  };
}

// inherits From RecordASTM
OrderASTM.prototype = new RecordASTM();

// Create Record
OrderASTM.prototype.createRecord = function (data, fields) {
  if (RecordASTM.prototype.createRecord.call(this, data, fields)) {
    this.setData(data);
    return true;
  }
  return false;
};

// Result ASTM
function ResultASTM () {
  var data = "";
  this.level = 3;
  this.typeIdentifier = "R";
  var comments = [];
  this.numberFieldsValid = 14;
  
  this.getData = function() {
      return data;
  };

  this.setData = function(value) {
    data = value;
  };
  
  this.getComments = function() {
    return comments;
  };
  
  this.getComment = function(index) {
    return comments[index];
  };
}

// inherits From RecordASTM
ResultASTM.prototype = new RecordASTM();

// Create Record
ResultASTM.prototype.createRecord = function (data, fields) {
  if (RecordASTM.prototype.createRecord.call(this, data, fields)) {
    this.setData(data);
    return true;
  }
  return false;
};


// Query ASTM
function QueryASTM () {
  var data = "";
  this.level = 2;
  this.typeIdentifier = "Q";
  this.numberFieldsValid = 13;
  
  this.getData = function() {
      return data;
  };

  this.setData = function(value) {
    data = value;
  };
}

// inherits From RecordASTM
QueryASTM.prototype = new RecordASTM();

// Create Record
QueryASTM.prototype.createRecord = function (data, fields) {
  if (RecordASTM.prototype.createRecord.call(this, data, fields)) {
    this.setData(data);
    return true;
  }
  return false;
};

// Finalrecord ASTM
function FinalRecordASTM () {
  var data = "";
  this.level = 0;
  this.typeIdentifier = "L";
  this.numberFieldsValid = 3;
  
  this.getData = function() {
      return data;
  };

  this.setData = function(value) {
    data = value;
  };
}

// inherits From RecordASTM
FinalRecordASTM.prototype = new RecordASTM();

// Create Record
FinalRecordASTM.prototype.createRecord = function (data, fields) {
  if (RecordASTM.prototype.createRecord.call(this, data, fields)) {
    this.setData(data);
    return true;
  }
  return false;
};

// Comment ASTM
function CommentASTM () {
  var data = "";
  this.typeIdentifier = "C";
  this.numberFieldsValid = 5;
  
  this.setData = function(value) {
    data = value;
  };

  this.getData = function() {
      return data;
  };
}

// inherits From RecordASTM
CommentASTM.prototype = new RecordASTM();

// Create Record
CommentASTM.prototype.createRecord = function (data, fields) {
  if (RecordASTM.prototype.createRecord.call(this, data, fields)) {
    this.setData(data);
    return true;
  }
  return false;
};


function ProtocolASTM () {
  this.header = new HeaderASTM();
  this.finalrecord = new FinalRecordASTM();
  this.currentLevel = 0;
}


// Create Header
ProtocolASTM.prototype.createHeader = function (data, fields) {
  var header = new HeaderASTM();
  header.createRecord(data, fields);
  if (header.fields.length > 0) {
    this.currentLevel = this.header.level;
    this.header = header;
    return true;
  }
  return false;
};

// Create Patient
ProtocolASTM.prototype.createPatient = function (data, fields) {
  var patient = new PatientASTM();
  patient.createRecord(data, fields);
  if (patient.fields.length > 0) {
    this.currentLevel = patient.level;
    this.header.getPatients().push(patient);
    return true;
  }
  return false;
};

// Create Order
ProtocolASTM.prototype.createOrder = function (data, fields) {
  var order = new OrderASTM();
  order.createRecord(data, fields);
  if ((order.fields.length > 0) && (this.currentLevel >= 1)) {
    this.currentLevel = order.level;
    currentPositionPatient = this.header.getPatients().length - 1;
    this.header.getPatient(currentPositionPatient).getOrders().push(order);
    return true;
  }
  return false;
};

// Create Result
ProtocolASTM.prototype.createResult = function (data, fields) {
  var result = new ResultASTM();
  result.createRecord(data, fields);
  if (result.fields.length > 0) {
    this.currentLevel = result.level;
    currentPositionPatient = this.header.getPatients().length - 1;
    currentPositionOrder = this.header.getPatient(currentPositionPatient).getOrders().length - 1;
    this.header.getPatient(currentPositionPatient).getOrder(currentPositionOrder).getResults().push(result);
    return true;
  }
  return false;
};


// Create Query
ProtocolASTM.prototype.createQuery = function (data, fields) {
  var query = new QueryASTM();
  query.createRecord(data, fields);
  if (query.fields.length > 0) {
    this.currentLevel = order.level;
    currentPositionPatient = this.header.getPatients().length - 1;
    this.header.patients[currentPositionPatient].queries.push(query);
    return true;
  }
  return false;
};

// Create Comments
ProtocolASTM.prototype.createComments = function (data, fields) {
  var comment = new CommentASTM();
  comment.createRecord(data, fields);
  if (comment.fields.length > 0) {
    switch (this.currentLevel) {
    case 0:
      this.header.comments.push(comment);
      break;
    case 1:
      currentPositionPatient = this.header.getPatients().length - 1;
      this.header.getPatient(currentPositionPatient).getComments().push(comment);
      break;
    case 2:
      currentPositionPatient = this.header.getPatients().length - 1;
      currentPositionOrder = this.header.getPatient(currentPositionPatient).getOrders().length - 1;
      this.header.getPatient(currentPositionPatient).getOrder(currentPositionOrder).getComments().push(comment);
      break;
    case 3:
      currentPositionPatient = this.header.getPatients().length - 1;
      currentPositionOrder = this.header.getPatient(currentPositionPatient).getOrders().length - 1;
      currentPositionResult = this.header.getPatient(currentPositionPatient).getOrder(currentPositionOrder).getResults().length - 1;
      this.header.getPatient(currentPositionPatient).getOrder(currentPositionOrder).getResult(currentPositionResult).getComments().push(comment);
      break;
    }
    return true;
  }
  return false;
};

// Create Final Record
ProtocolASTM.prototype.createFinalRecord = function (data, fields) {
  var finalrecord = new FinalRecordASTM();
  finalrecord.createRecord(data, fields);
  if (finalrecord.fields.length > 0) {
    this.currentLevel = this.finalrecord.level;
    this.finalrecord = finalrecord;
    return true;
  }
  return false;
};


ProtocolASTM.prototype.readInputData = function (data) {
  var fields = [];
  var currentPositionPatient = 0;
  var currentPositionOrder = 0;

  // Convert the data to fields
  fields = this.createFields(data);
  // Create Header
  var recordCreated = this.createHeader(data, fields) ||
  // Create Patient
  this.createPatient(data, fields) ||
  // Create Order
  this.createOrder(data, fields) ||
  // Create Result
  this.createResult(data, fields) ||
  // Create Query
  this.createQuery(data, fields) ||
  // Create Comments
  this.createComments(data, fields) ||
  // Create Final Record
  this.createFinalRecord(data, fields);
  
  return recordCreated;
};


ProtocolASTM.prototype.createFields = function (data) {
  var fields = [];
  var character = "";
  var sumOfcharacters = "";
  var position = 1;
  var i;
  for (i = 0; i <= data.length; i++) {
    character = data.substr(i, 1);
    if ( character === "|" )
      character = "";
    sumOfcharacters += character;
    if ( character === "" ) {
      var field = new FieldsASTM();
      field.value = sumOfcharacters;
      fields.push(field);
      sumOfcharacters = "";
    }
  }
  return fields;
};

ProtocolASTM.prototype.isValidRecord = function (data) {
  var fields = [];
  var header = new HeaderASTM();
  var patient = new PatientASTM();
  var order = new OrderASTM();
  var result = new ResultASTM();
  var query = new QueryASTM();
  var comment = new CommentASTM();
  var finalRecord = new FinalRecordASTM();

  // Convert the data to fields
  fields = this.createFields(data);
  // Validate the header format
  var validFormat = header.isValidRecord(data, fields) ||
  // Validate the patient format
  patient.isValidRecord(data, fields) ||
  // Validate the order format
  order.isValidRecord(data, fields) ||
  // Validate the result format
  result.isValidRecord(data, fields) ||
  // Validate the query format
  query.isValidRecord(data, fields) ||
  // Validate the comment format
  comment.isValidRecord(data, fields) ||
  // Validate the final record format
  finalRecord.isValidRecord(data, fields);
  
  return validFormat;
};

ProtocolASTM.prototype.getArrayWithFullPatientProtocol = function () {
  var arrayProtocol = [];
  var currentHeader;
  var patients;
  var posP;
  var currentPatient;
  var commentsP;
  var posCommentP;
  var orders;
  var posO;
  var currentOrder;
  var commentsO;
  var posCommentO;
  var results;
  var posR;
  var currentResult;
  var commentsR;
  var posCommentR;
  var currentFinalRecord;
  
  // Header
  currentHeader = this.header;
  if (currentHeader.getData().length > 0 )
    arrayProtocol.push(currentHeader.getData());
  patients = currentHeader.getPatients();
  for (posP = 0; posP < patients.length; posP++) {
    // Patient
    currentPatient = this.header.getPatient(0);
    arrayProtocol.push(currentPatient.getData());
    // Comments
    commentsP = currentPatient.getComments();
    for (posCommentP = 0; posCommentP < commentsP.length; posCommentP++) {
     arrayProtocol.push(currentPatient.getComment(posCommentP).getData());
    }
    orders = currentPatient.getOrders();
    for (posO = 0; posO < orders.length; posO++) {
      // Order
      currentOrder = currentPatient.getOrder(posO);
      arrayProtocol.push(currentOrder.getData());
      // Comments
      commentsO = currentOrder.getComments();
      for (posCommentO = 0; posCommentO < commentsO.length; posCommentO++) {
        arrayProtocol.push(currentOrder.getComment(posCommentO).getData());
      }
      results = currentOrder.getResults();
      for (posR = 0; posR < results.length; posR++) {
        // Result
        currentResult = currentOrder.getResult(posR);
        arrayProtocol.push(currentResult.getData());
        // Comments
        commentsR = currentResult.getComments();
        for (posCommentR = 0; posCommentR < commentsR.length; posCommentR++) {
          arrayProtocol.push(currentResult.getComment(posCommentR).getData());
        }
      }
    }
  }
  // Final record
  currentFinalRecord = this.finalrecord;
  if (currentFinalRecord.getData().length > 0 )
    arrayProtocol.push(currentFinalRecord.getData());

  return arrayProtocol;
};
