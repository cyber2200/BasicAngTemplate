var phonecatServices = angular.module('dataServices', ['ngResource']);

phonecatServices.factory('Data', ['$resource', function($resource){
	return $resource('./api.php', {}, {
		query: {method:'GET', params:{'func' : 'getData'}, isArray:true},
	});
}]);