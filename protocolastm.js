function FieldsASTM () {
  this.key = "";
  this.value = "";
}


function RecordASTM () {
  this.typeIdentifier = "";
  this.data = "";
  this.fields = [];
}

RecordASTM.prototype.isValidIdentifier = function (id) {
  if (this.typeIdentifier === id)
    return true;
  return false;
};

RecordASTM.prototype.createRecord = function (data, fields) {
  var id = data.substr(0, 1);
  if (this.isValidIdentifier(id)) {
    this.data = data;
    this.fields = fields;
  }
};

function HeaderASTM () {
  this.typeIdentifier = "H";
}

// inherits From RecordASTM
HeaderASTM.prototype = new RecordASTM();


function OrderASTM () {
  this.typeIdentifier = "O";
}

// inherits From RecordASTM
OrderASTM.prototype = new RecordASTM();

function PatientASTM () {
  this.typeIdentifier = "P";
}

// inherits From RecordASTM
PatientASTM.prototype = new RecordASTM();

function CommentASTM () {
  this.typeIdentifier = "C";
}

// inherits From RecordASTM
CommentASTM.prototype = new RecordASTM();

function ProtocolASTM () {
  this.header = new HeaderASTM();
  this.comments = [];
  this.patients = [];
  this.orders = [];
/*ManufacturerASTM manufacturers[];
  QueryASTM queries[];
  FinalrecordASTM finalrecord;*/
}

ProtocolASTM.prototype.cleanSpecialCharacters = function (data) {
  // backslash (\)
  var newData = data.replace(/\\/g, "\\\\");
  return newData;
};

ProtocolASTM.prototype.readInputData = function (data) {
  var fields = [];
  // Clean special character
  var newData = protocol.cleanSpecialCharacters(data);
  // Convert the data to fields
  fields = this.createFields(newData);
  // Create Header
  this.header.createRecord(newData, fields);
  // Create Patient
  var patient = new PatientASTM();
  patient.createRecord(newData, fields);
  if (patient.fields.length > 0)
    this.patients[this.comments.length] = patient;
  // Create Order
  var order = new OrderASTM();
  order.createRecord(newData, fields);
  if (order.fields.length > 0)
    this.orders[this.orders.length] = order;
  // Create Comments
  var comment = new CommentASTM();
  comment.createRecord(newData, fields);
  if (comment.fields.length > 0)
    this.comments[this.comments.length] = comment;
  
};


ProtocolASTM.prototype.createFields = function (value) {
  var fields = [];
  var character = "";
  var sumOfcharacters = "";
  var position = 1;
  var i;
  for (i = 0; i <= value.length; i++) {
    character = value.substr(i, 1);
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


var protocol = new ProtocolASTM();

protocol.readInputData("H|\\^&|||EPOC^Blood Analysis^EDM^Data Manager|||||||P||201645102825");
protocol.readInputData("P|1|A1E18155MHE|||||||||||||||||||||20160405102825||||||||||");
protocol.readInputData("O|1|A1E18155MHE||ALL|R|20160405082748|20160405082748||||X||||1||||||||||F");
protocol.readInputData("R|1|^^^Hct^^^^323.1|47|%||N||F||^dinamica||20160405082748|323.1");
protocol.readInputData("R|2|^^^Na+^^^^323.1|135|mmol/L||L||F||^dinamica||20160405082748|323.1");
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


