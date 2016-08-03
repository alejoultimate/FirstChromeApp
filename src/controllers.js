var app = angular.module('myApp', []);

app.config(['$locationProvider', function($locationProvider) {
  $locationProvider.html5Mode( true );
}]);

app.factory('Page', function(){
  // Definir el título de la pagina con el nombre de la aplicación
  var title = chrome.runtime.getManifest().name;
  return {
    getTitle: function() { return title; },
  };
});

app.controller('mainCtrl', function($scope, Page) {
  $scope.Page = Page;
});


app.run(['$log', function($log) {
   $log.getInstance = function(context) {
      return {
         log   : enhanceLogging($log.log, context),
         info  : enhanceLogging($log.info, context),
         warn  : enhanceLogging($log.warn, context),
         debug : enhanceLogging($log.debug, context),
         error : enhanceLogging($log.error, context)
      };
   };
   
   function enhanceLogging(loggingFunc, context) {
      return function() {
         var modifiedArguments = [].slice.call(arguments);
         modifiedArguments[0] = [moment().format("dddd h:mm:ss a") + '::[' + context + ']&gt; '] + modifiedArguments[0];
         loggingFunc.apply(null, modifiedArguments);
      };
   }
}]);
