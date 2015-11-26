var dataServices = angular.module('dataServices', ['ngResource']);

dataServices.factory('Data', ['$resource', function($resource){
	return $resource('./api.php', {}, {
		query: {method:'GET', params:{'func' : 'getData'}, isArray:true},
	});
}]);
dataServices.factory('DataService', ['$http', function($http){
	return {
		done : false,
		addUser : function(name){
			this.done = false;
			var req = {
				method : 'POST',
				url : './api.php?func=addUser',
				headers : {},
				data : {'name' : name}
			}
			$http(req).then(function success(res) {
				this.done = true;
			});
		},
		isDone : function() {
			return this.done;
		}
	}
}]);