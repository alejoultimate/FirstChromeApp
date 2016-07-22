var services = angular.module('myApp.servicioDatos', ['ngResource']);

services.factory('ServicioResultados', ['$resource', function($resource) {
  return $resource('http://epsarpdllo01.suranet.com/MensajeriaDinamica/rest/datosLab/pruebaTrama', {}, {
    enviarResultado: {
      url: 'http://epsarpdllo01.suranet.com/MensajeriaDinamica/rest/datosLab/pruebaTrama',
      method: 'POST',
      isArray: false,
      params: {
        trama: '@trama',
        sistema: '@sistema'
      }
    }
  });
}]);
