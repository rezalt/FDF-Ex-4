/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var myApp = angular.module('countriesApp', ['ngRoute']);

myApp.controller('dataController', ['$scope', 'dataFactory', function ($scope, dataFactory) {


        
        $scope.status;
        $scope.allCountries;
        $scope.countriesByRegion;
        $scope.countriesbyCode;
 

        getCountries();
        getCountriesByRegion();
        getCountriesByCode();

        function getCountries() {
            dataFactory.getCountries()
                    .then(function (response) {
                        $scope.allCountries = response.data;
                    }, function (error) {
                        $scope.status = 'Unable to load country data: ' + error.message;
                    });
        }
        function getCountriesByRegion() {
            dataFactory.getCountriesByRegion()
                    .then(function (response) {
                        $scope.countriesByRegion = response.data;
                    }, function (error) {
                        $scope.status = 'Unable to load country data: ' + error.message;
                    });
        }
        function getCountriesByCode() {
            dataFactory.getCountriesByCode()
                    .then(function (response) {
                        $scope.countriesbyCode = response.data;
                    }, function (error) {
                        $scope.status = 'Unable to load country data: ' + error.message;
                    });
        }
        
        

    }]);

myApp.factory('dataFactory', ['$http', function ($http)
    {

        var dataFactory = {};
        
        dataFactory.getCountries = function () {
            return $http.get("https://restcountries.eu/rest/v1/all");
        };

        dataFactory.getCountriesByRegion = function () {
            return $http.get("https://restcountries.eu/rest/v1/region/africa");
        };

        dataFactory.getCountriesByCode = function () {
            return $http.get("https://restcountries.eu/rest/v1/alpha?codes=gb");
        };
        
    return dataFactory;
    }]);

myApp.config(function ($routeProvider)
{
    $routeProvider
            .when('/ac', {
                templateUrl: 'AllCountries.html',
                controller: 'dataController'
            })
            .when('/cfr', {
                templateUrl: 'CountriesRegion.html',
                controller: 'dataController'
            })
            .when('/cfc', {
                templateUrl: 'CountryCode.html',
                controller: 'dataController'
            })
            .otherwise({
                redirectTo: '/AllCountries.html'
            });
});
