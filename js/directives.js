var crudDirectives = angular.module('crudDirectives', []);
crudDirectives.directive('myTest', function(){
	return {
		templateUrl : 'templates/test.html'
	}
});