var crudApp = angular.module('crudApp', [
	'ngRoute',
	'ngResource',
	'ngToast',
	'ngAnimate',
	'crudControllers',
	'dataServices',
	'crudDirectives',
]);

crudApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	when('/show', {
		templateUrl: 'partials/show.html',
		controller: 'ShowCtrl'
	}).
	when('/add', {
		templateUrl: 'partials/add.html',
		controller: 'AddCtrl'
	}).
	when('/edit/:id', {
		templateUrl: 'partials/edit.html',
		controller: 'EditCtrl'	
	}).
	otherwise({
		redirectTo: '/show'
	});
}]);

crudApp.config(['ngToastProvider', function(ngToastProvider) {
	ngToastProvider.configure({
		animation: 'slide',
		verticalPosition: 'top',
		horizontalPosition: 'center',
	});
}]);
