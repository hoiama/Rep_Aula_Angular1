
/**
 * Declaração de módulo 'app' usando modulo ngRoute para criacao de rotas
 *
 * ngRoute -  sistema de roteamento de URLs
 * angular.filter - filtro personalizado criado
 */
var app = angular.module('app', ['ngRoute', 'ngResource', 'angular.filter']);


/**
 * Configuração do ngRoute com as rotas > controller > templates
 */
app.config([
    '$routeProvider', function($routeProvider){
        $routeProvider
            .when('/', {
                controller:'DefaultController',
                templateUrl:'templates/default-template.html'
            })
            .when('/testesAngular', {
                controller:'TestesAngularController',
                templateUrl:'templates/controller.html',
            })
            .otherwise({redirectTo:'/'});
    }

]);

app.directive("minhaDiretiva", minhaDiretiva);
app.directive("meuPainel", meuPainel);
app.directive("minhaDiretiva", minhaDiretiva);

/**
 * Variavel de escopo global da aplicação
 * @param {rootScope} $rootScope - Escopo que pode ser usada global
 */
app.run([
    '$rootScope', function($rootScope){
        $rootScope.listFruits = ["banana", "maca"];
        console.log($rootScope.listFruits);
        console.log('app.run');
    }
]);

// ** CONTROLLER's **

/**
 * Controller padrão da página princinal
 */
app.controller('DefaultController', function(){

})


app.controller("TestesAngularController", ['$scope', '$filter', '$http', 'fabricaHttpPromise', function($scope, $filter, $http, fabricaHttpPromise){
    $scope.colors = ["White", "Black", "Blue", "Red", "Silver"];
    $scope.colors2 = ["Branco", "Preto", "Azul", "Vermelho", "Cinza"];
    $scope.mostraEsconde = ["ng-hide", "ng-if", "ng-show"];
    $scope.status= ["Ativado", "Desativado"];
    $scope.statusSelected ="";
    $scope.statusSelectedngHide="";
    $scope.statusSelectedngShow ="";
    $scope.statusSelectedngIf ="";
    $scope.ngModel = "";
    $scope.mostraEscondeSelected = "";
    $scope.colorSelected = "";
    $scope.data = "22/02/2018";
    $scope.PROpriedade = "testes de PROpriedade";
    $scope.appTitle = $filter("uppercase")("Filtrando para Uppercase");
    $scope.placa = "";
    $scope.cpf = "";
    $scope.cpf2 = "";
    $scope.listCaronas = Array();

    $scope.carros =
        [
            {vidro: 2, portas: 5,mala: 8},
            {vidro: 1, portas: 4,mala: 7},
            {vidro: 3, portas: 6,mala: 9},
        ]


    $scope.getListCaronas = function(){
        fabricaHttpPromise.getCaronas
            .then(function(data, status) {
                console.log("retorno: ", data);
                console.log("estado: " , status);
                $scope.listCaronas = data.data;
            })
            .catch(function(erro) {
                console.log(erro)
            });
    }
}]);


// ** DIRETIVAS **

/**
 * Demostração de templates
 */
function minhaDiretiva(){
    return {
        template:
            "<div class='alert'>" +
                "<span class='alert-topic'>" +
                    "Sou um template da diretiva minhaDiretiva!" +
                "</span>" +
            "</div>"
    };
};


/**
 * Diretiva que retorna um ddo contendo template e propriedades do scope. parte 13
 */
 function meuPainel(){
    restrict: 'AE';
    var ddo = {};

    ddo.scope = {
        propriedade1: '@propriedade1'
    }

    ddo.template = '<p>Sou um Template da diretiva meuPainel, minha propriedade eh: {{propriedade1}} </p>';
    return ddo;
};


/**
 * Diretiva que retorna um ddo contendo template e propriedades do scope.
 */
function minhaDiretiva (){
    restrict:"AE";
    var ddo = {};

    ddo.scope = {
        propriedade1: '@propriedade1'
    }

    ddo.templateUrl = "templates/fragmentoHtml.html"
    return ddo;
};


// ** FILTROS **

app.filter("filtroPlacas", function(){
    return function (input) {
        var parte1 = input.substring(0,3);
        var parte2 = input.substring(3,6);
        var parte3 = input.substring(6,9);
        var parte4 = input.substring(9,12);
        return parte1 + "." + parte2 + "." + parte3 + "-" + parte4;
    };
});


// ** FABRICAS **

app.factory("fabricaHttpPromise", function ($http) {
    var _getCaronas = function () {
        return $http.get("/carona");
    }

    var _postCarona = function (carona) {
        return $http.post("/carona", carona);
    }

    var _putCarona = function (carona) {
        return $http.put("/carona", carona);
    }

    var _deleteCarona = function(carona){
        return $http.delete("/carona");
    }

    return {
        getCaronas : _getCaronas(),
        postCarona : _postCarona(),
        putCarona : _putCarona(),
        deleteCarona : _deleteCarona()
    }
})

