var testApp = angular.module('testApp', [
	'ngRoute',
	'testControllers'
]);

testApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	when('/test1', {
		templateUrl: 'partials/test1.html',
		controller: 'Test1Ctrl'
	}).
	when('/test2', {
		templateUrl: 'partials/test2.html',
		controller: 'Test2Ctrl'
	}).
	otherwise({
		redirectTo: '/test1'
	});
}]);