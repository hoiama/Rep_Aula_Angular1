
/**
 * Declaração de módulo 'app' usando modulo ngRoute para criacao de rotas
 */
var app = angular.module('app', ['ngRoute', 'ngResource']);


/**
 * Configuração do ngRoute com as rotas > controller > templates
 */
app.config([
    '$routeProvider', function($routeProvider){
        $routeProvider
            .when('/', {
                controller:'listController',
                templateUrl:'listTemplate.html'
            })
            .when('/new', {
                controller:'newController',
                templateUrl:'editTemplate.html'
            })
            .when('/teste', {
                controller:'simpleControllerOne',
                templateUrl:'testeTemplate.html'
            })
            .when('/edit:name', {
                controller:'editController',
                templateUrl:'editTemplate.html'
            })
            .when('/http', {
                controller:'httpController',
                templateUrl:'httpTemplate.html'
            })
            .when('/resource',{
                controller:'resourceController',
                templateUrl:'resourceTemplate'
            })
            .otherwise({redirectTo:'/teste'});
    }
]);


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


/**
 * Controller de lista, sem funcionalidade
 * @param {scopo} $scope - Escopo que pode ser usada no controller criado
 */
app.controller('listController', function($scope){
    console.log('listaController');
});


/**
 * Controller que edita elementos da lista de frutas
 * @param {scopo} $scope - Escopo que pode ser usada no controller criado
 * @param {location} $location - Redireciona as rotas
 * @param {routeParams} $routeParams - Obtem parametros repassados pela URI  
 */
app.controller('editController', function($scope, $location, $routeParams){
    $scope.title = "editar fruta";
    $scope.fruit = $routeParams.name;
    $scope.fruitIndex = $scope.listFruits.indexOf($scope.fruit);
    $scope.save = function(){
        $scope.fruits[$scope.fruitIndex] = $scope.fruit;
        $location.path('/');
    }
});


/**
 * Adiciona um novo item a lista de frutas
 * @param {scopo} $scope - Escopo que pode ser usada no controller criado
 * @param {} $location - Redireciona as rotas
 * @param {tipo} $routeParams - Obtem parametros repassados pela URI  
 */
app.controller('newController', function($scope, $location, $routeParams){
    console.log('editController');
    $scope.title = "Nova fruta";
    $scope.fruit = "";
    $scope.save = function(){
        $scope.fruits.push($scope.fruit);
        $location.path('/');
    }
});


app.controller('simpleControllerOne', function ($scope) {
    $scope.user = {name:""}
    $scope.frutas = ['banana', 'maça', 'goiaba'];
    $scope.counter = 0;

    $scope.addOne = function(){
        $scope.counter++;
    };
});


app.controller('httpController', function($scope, $http){
    $scope.fruits = Array();
    $scope.getData = function(){
        $http.get('listFruitJson.html')
            .then(
                function(respose){
                    $scope.fruits = respose.data.fruits;
                    console.log('respose.data', respose.data); 
                    console.log('respose', respose);
                    console.log('respose.data.fruits', respose.data.fruits);
                },
                function(erro){
                    alert('Erro..."');
                    console.log(erro);  
                }
            )      
    }
})

app.controller('resourceController', function($scope, Sresource){
    var Fruits = $resource("listFruitJson.html");
    $scope.getFruits = function(){
        Fruits.query(function(data){
            console.log(data);
        })
    }
})