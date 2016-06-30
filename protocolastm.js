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
  
  
  currentHeader = this.header;
  arrayProtocol.push(currentHeader.getData());
  patients = currentHeader.getPatients();
  for (posP = 0; posP < patients.length; posP++) {
    currentPatient = this.header.getPatient(0);
    arrayProtocol.push(currentPatient.getData());
    commentsP = currentPatient.getComments();
    for (posCommentP = 0; posCommentP < commentsP.length; posCommentP++) {
     arrayProtocol.push(currentPatient.getComment(posCommentP).getData()); 
    }
    orders = currentPatient.getOrders();
    for (posO = 0; posO < orders.length; posO++) {
      currentOrder = currentPatient.getOrder(posO);
      arrayProtocol.push(currentOrder.getData());
      commentsO = currentOrder.getComments();
      for (posCommentO = 0; posCommentO < commentsO.length; posCommentO++) {
        arrayProtocol.push(currentOrder.getComment(posCommentO).getData());
      }
      results = currentOrder.getResults();
      for (posR = 0; posR < results.length; posR++) {
        currentResult = currentOrder.getResult(posR);
        arrayProtocol.push(currentResult.getData());
        commentsR = currentResult.getComments();
        for (posCommentR = 0; posCommentR < commentsR.length; posCommentR++) {
          arrayProtocol.push(currentResult.getComment(posCommentR).getData());
        }
      }
    }
  }

  return arrayProtocol;
};

/*
var protocol = new ProtocolASTM();

protocol.readInputData("R|3|^^^K+^^^^323.1|3.2|mmol/L||L||F||^dinamica||20160405082748|323.1");
protocol.readInputData("R|4|^^^Ca++^^^^323.1|1.04|mmol/L||L||F||^dinamica||20160405082748|323.1");
protocol.readInputData("R|5|^^^pH^^^^323.1|7.467|||H||F||^dinamica||20160405082748|323.1");
protocol.readInputData("R|6|^^^pCO2^^^^323.1|33.8|mmHg||L||F||^dinamica||20160405082748|323.1");
protocol.readInputData("R|7|^^^pO2^^^^323.1|39.0|mmHg||L||F||^dinamica||20160405082748|323.1");
protocol.readInputData("R|8|^^^Glu^^^^323.1|116|mg/dL||H||F||^dinamica||20160405082748|323.1");
protocol.readInputData("R|9|^^^Lact^^^^323.1|2.32|mmol/L||H||F||^dinamica||20160405082748|323.1");
protocol.readInputData("R|10|^^^cHgb^^^^323.1|16.0|g/dL||N||F||^dinamica||20160405082748|323.1");
protocol.readInputData("R|11|^^^HCO3-act^^^^323.1|24.4|mmol/L||N||F||^dinamica||20160405082748|323.1");
protocol.readInputData("R|12|^^^cTCO2^^^^323.1|25.4|mmol/L||N||F||^dinamica||20160405082748|323.1");
protocol.readInputData("R|13|^^^BE(ecf)^^^^323.1|0.7|mmol/L||N||F||^dinamica||20160405082748|323.1");
protocol.readInputData("R|14|^^^BE(b)^^^^323.1|1.3|mmol/L||N||F||^dinamica||20160405082748|323.1");
protocol.readInputData("R|15|^^^O2SAT^^^^323.1|77.6|%||L||F||^dinamica||20160405082748|323.1");
protocol.readInputData("R|16|^^^Test duration^^^^323.1|239.6|||N||F||^dinamica||20160405082748|323.1");
protocol.readInputData("R|17|^^^Department name^^^^323.1|Default|||N||F||^dinamica||20160405082748|323.1");
protocol.readInputData("R|18|^^^Sample type^^^^323.1|Unspecified|||N||F||^dinamica||20160405082748|323.1");
protocol.readInputData("R|19|^^^Hemodilution^^^^323.1|No|||N||F||^dinamica||20160405082748|323.1");
protocol.readInputData("R|20|^^^ReaderMaintenanceRequired^^^^323.1|No|||N||F||^dinamica||20160405082748|323.1");
protocol.readInputData("R|21|^^^Bubble width^^^^323.1|0.65|||N||F||^dinamica||20160405082748|323.1");
protocol.readInputData("R|22|^^^Ambient Temperature^^^^323.1|21.6|C||N||F||^dinamica||20160405082748|323.1");
protocol.readInputData("R|23|^^^Ambient Pressure^^^^323.1|643.1|mmHg||N||F||^dinamica||20160405082748|323.1");
protocol.readInputData("R|24|^^^Patient Id entry method^^^^323.1|2|||N||F||^dinamica||20160405082748|323.1");
protocol.readInputData("R|25|^^^Patient Id lookup code^^^^323.1|6|||N||F||^dinamica||20160405082748|323.1");
protocol.readInputData("R|26|^^^eQC time^^^^323.1|05-Apr-16 08:24:19|||N||F||^dinamica||20160405082748|323.1");
protocol.readInputData("R|27|^^^eVAD version^^^^323.1|NotAvailable|||N||F||^dinamica||20160405082748|323.1");
protocol.readInputData("R|28|^^^EDM Test status^^^^323.1|Success|||N||F||^dinamica||20160405082748|323.1");
protocol.readInputData("R|29|^^^Criticals present^^^^323.1|No|||N||F||^dinamica||20160405082748|323.1");
protocol.readInputData("R|30|^^^EnforceCriticalHandling^^^^323.1|Yes|||N||F||^dinamica||20160405082748|323.1");
protocol.readInputData("R|31|^^^Host mode^^^^323.1|0|||N||F||^dinamica||20160405082748|323.1");
protocol.readInputData("R|32|^^^QCScheduleState^^^^323.1|0|||N||F||^dinamica||20160405082748|323.1");
protocol.readInputData("R|33|^^^CVScheduleState^^^^323.1|0|||N||F||^dinamica||20160405082748|323.1");
protocol.readInputData("R|34|^^^TQAScheduleState^^^^323.1|0|||N||F||^dinamica||20160405082748|323.1");
protocol.readInputData("R|35|^^^QAScheduleState^^^^323.1|0|||N||F||^dinamica||20160405082748|323.1");
protocol.readInputData("R|36|^^^Card Lot^^^^323.1|07-15313-30|||N||F||^dinamica||20160405082748|323.1");
protocol.readInputData("R|37|^^^Card Expiration Date^^^^323.1|20160425|||N||F||^dinamica||20160405082748|323.1");
protocol.readInputData("R|38|^^^HostSerNum^^^^323.1|15065521400740|||N||F||^dinamica||20160405082748|323.1");
protocol.readInputData("R|39|^^^Host Alias^^^^323.1|15065521400740|||N||F||^dinamica||20160405082748|323.1");
protocol.readInputData("R|40|^^^ReaderSerNum^^^^323.1|11716|||N||F||^dinamica||20160405082748|323.1");
protocol.readInputData("R|41|^^^Reader Alias^^^^323.1|Rdr11716|||N||F||^dinamica||20160405082748|323.1");
protocol.readInputData("L|1|N");


console.log(protocol);
*/
