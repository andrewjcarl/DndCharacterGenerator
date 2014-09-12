'use strict';

angular.module('myApp.characterSheet', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/character', {
    templateUrl: 'views/characterSheet/characterSheet.html',
    controller: 'characterCtrl'
  });
}])

.controller('characterCtrl', ['$http', '$scope', function($http, $scope) {

	$scope.pageSettings = {};
	$scope.character = {};
	$scope.sheet = {};

	$http.get('config/settings.json').success(function(data) {
		console.log(data);
		$scope.pageSettings = data;
	});

	$http.get('characters/1.json').success(function(data) {
		console.log(data);
		$scope.character = data;
	});


	$scope.intTotal = function(arr) {
		console.log(arr);
	}


	$scope.updateModifiers = function(type) {
		var _value = $scope.character.attributes[type].score,
			_mod = Math.floor((_value-10)/2);

		$scope.character.attributes[type].mod = _mod;
		debugger;
		return _mod;
	}

	$scope.roll = function(dice,value) {
		var randomVal = Math.floor((Math.random() * parseInt(dice)) + 1);
		var result =   randomVal + parseInt(value);
		console.log("You rolled a " + result + " (" + randomVal + "+" + parseInt(value) + ")");
	}


	$scope.parseValues = function() {
		console.log($scope.character);
		console.log($scope.sheet);
	}


}])
.directive('integer', function(){
    return {
        require: 'ngModel',
        link: function(scope, ele, attr, ctrl){
            ctrl.$parsers.unshift(function(viewValue){
                return parseInt(viewValue, 10);
            });
        }
    };
})
.directive('modifier', function() {
	return {
		require: 'ngModel',
		link: function(scope,elem,attr,ctrl) {
			var attr = scope.attr.abbr;
			console.log(attr);
		}
	}
});