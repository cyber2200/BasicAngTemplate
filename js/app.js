var testApp = angular.module('testApp', [
	'ngRoute',
	'ngResource',
	'testControllers',
	'dataServices',
]);

testApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	when('/show', {
		templateUrl: 'partials/show.html',
		controller: 'ShowCtrl'
	}).
	when('/add', {
		templateUrl: 'partials/add.html',
		controller: 'AddCtrl'
	}).
	otherwise({
		redirectTo: '/show'
	});
}]);