var app = angular.module('myApp', []);

app.config(['$locationProvider', function($locationProvider) {
  $locationProvider.html5Mode( true );
}]);

app.factory('Page', function(){
  var title = 'SIRIUS.SerialPortToASTM()';
  return {
    title: function() { return title; },
  };
});

app.controller('mainCtrl', function($scope, Page) {
  $scope.Page = Page;
});
