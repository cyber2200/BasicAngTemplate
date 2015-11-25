var dataServices = angular.module('dataServices', ['ngResource']);

dataServices.factory('Data', ['$resource', function($resource){
	return $resource('./api.php', {}, {
		query: {method:'GET', params:{'func' : 'getData'}, isArray:true},
	});
}]);
dataServices.factory('DataService', function(){
	return function(msg) {
		alert(msg);
	}
});
dataServices.factory('DataService1', function(){
	return {
		t1 : function(){
			console.log('t1');
		}
	}
});