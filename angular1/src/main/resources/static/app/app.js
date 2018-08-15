/**
 * Declaração de módulo 'app' usando modulo ngRoute para criacao de rotas
 *
 * ngRoute -  sistema de roteamento de URLs
 * angular.filter - filtro personalizado criado
 */
var app = angular.module('app', ['ngRoute', 'ngResource', 'meusServicoModulo', 'angular.filter']);


/**
 * Configuração do ngRoute com as rotas > controller > templates
 */
app.config([
    '$routeProvider' , function($routeProvider){

        $routeProvider
            .when('/', {
                controller:'DefaultController',
                templateUrl:'templates/default-template.html'
            })
            .when('/angular', {
                controller:'TestesAngularController',
                templateUrl:'templates/main-template.html',
                resolve: {
                    "listaCaronas" : function(fabricaHttpPromise){return fabricaHttpPromise.getCaronas()}
                }

            })
            .otherwise({redirectTo:'/'});
    }

]);


app.directive("minhaDiretiva", minhaDiretiva);
app.directive("meuPainel", meuPainel);


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


app.controller("TestesAngularController", ['$scope', '$filter', '$http', 'fabricaHttpPromise', 'listaCaronas', 'recursoCarona', function($scope,  $filter,  $http,  fabricaHttpPromise,  listaCaronas, recursoCarona){
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
    $scope.listCaronas2 = listaCaronas.data;
    $scope.listCaronas3 = listaCaronas.data;
    $scope.plateCounter = -1;
    $scope.carona = {};
    $scope.listCaronaCondutor;

    $scope.getListCaronas2 = function(){
        recursoCarona.query(
            function (retorno) {
                console.log("retorno do get", retorno);
                $scope.mensagemSucesso = "Lista Obtida com sucesso";
                $scope.listCaronas = retorno.data;
                $scope.listCaronas3 = retorno.data;
            },
            function (erro) {
                console.log(erro);
            }
        )
    }

    $scope.deleteCarona2 = function(carona){
        recursoCarona.delete({idCarona : carona.idCarona},
            function (retorno) {
                console.log("retorno do delete", retorno);
                var indiceCarona = $scope.listCaronas3.indexOf(carona);
                $scope.listCaronas3.splice(indiceCarona, 1);
                console.log(carona.nomeCondutor, "foi removido");
                $scope.mensagemSucesso = carona.nomeCondutor + " Removido com sucesso";
            },
            function (erro) {
                console.log(erro);
            }
       );
    }


    $scope.getListCaronas = function(){
        fabricaHttpPromise.getCaronas()
            .then(function(data, status) {
                console.log("Dados de retorno do Get: ", data);
                console.log("estado do Get: " , status);
                $scope.listCaronas = data.data;
                $scope.listCaronas3 = data.data;
            })
            .catch(function(erro) {
                console.log(erro)
            });
    }


    $scope.setCarona = function(){
        if($scope.carona.idCarona){
            console.log("Editando", $scope.carona.nomeCondutor);
            $scope.editCarona();
        }else {
            console.log("carona:", $scope.carona);
            fabricaHttpPromise.postCarona($scope.carona)
                .then(function (respost) {
                    console.log("Resposta do Post no servidor:", respost);
                    $scope.getListCaronas();
                    $scope.mensagemSucesso = $scope.carona.nomeCondutor + " Adicionado com sucesso";
                    $scope.carona = {};
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }


    $scope.editCarona = function(){
        fabricaHttpPromise
            .putCarona($scope.carona)
            .then(function(resposta){
                console.log("Edição de carona", $scope.carona.idCarona ,$scope.carona.nomeCondutor);
                $scope.carona = {};/**/
            })
            .catch(function(error){
                console.log(error);
            })
    }


    $scope.edit = function(carona){
        console.log(carona);
        $scope.carona.nomeCondutor = carona.nomeCondutor;
        $scope.carona.destinoCondutor = carona.destinoCondutor;
        $scope.carona.idCarona = carona.idCarona;
    }


    $scope.deleteCarona = function(carona){
        console.log("Deletar id:", carona.idCarona);
        fabricaHttpPromise
            .deleteCarona(carona.idCarona)
            .then(function(respost){
                console.log(respost);
                var indiceCarona = $scope.listCaronas3.indexOf(carona);
                console.log("index é :", indiceCarona);
                $scope.listCaronas3.splice(indiceCarona, 1);
                console.log(carona.nomeCondutor, "foi removido");
                $scope.mensagemSucesso = carona.nomeCondutor + " Removido com sucesso";
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    $scope.$watch("placaCarro", function () {
        $scope.plateCounter++;
    });


    $scope.carros =
        [
            {vidro: 2, portas: 5,mala: 8},
            {vidro: 1, portas: 4,mala: 7},
            {vidro: 3, portas: 6,mala: 9},
        ]

    /**
     * linha 16 -  insere cadastro de nome e cpf no console
     */
    $scope.setUsuario = function(){
        console.log("usuario:", $scope.carona);
    }

}]);



// ** DIRETIVAS **

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
        return $http.put("/carona/"+carona.idCarona, carona);
    }

    var _deleteCarona = function(id){
        return $http.delete("/carona/" + id);
    }

    return {
        getCaronas : _getCaronas,
        postCarona : _postCarona,
        putCarona : _putCarona,
        deleteCarona : _deleteCarona
    }
})

