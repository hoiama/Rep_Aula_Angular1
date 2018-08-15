var appService = angular.module('meusServicoModulo', ['ngResource']);

appService.factory('recursoCarona',function ($resource) {
    return $resource("carona/:idCarona", null,{
        update : {
            method: 'PUT'
        }
    });
})
