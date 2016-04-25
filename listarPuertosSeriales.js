var onGetDevices = function(ports) {
  var x = document.getElementById("listaDePuertos");
  for (var i=0; i<ports.length; i++) {
    var option = document.createElement("option");
    option.text = ports[i].path;
    x.add(option);
    console.log(ports[i].path);
  }
};

chrome.serial.getDevices(onGetDevices);
