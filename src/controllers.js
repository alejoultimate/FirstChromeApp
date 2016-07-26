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
