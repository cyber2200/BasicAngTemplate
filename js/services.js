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
		},
		deleteUser : function(id) {
			this.done = false;
			var req = {
				method : 'POST',
				url : './api.php?func=deleteUser',
				headers : {},
				data : {'id' : id}
			}
			$http(req).then(function success(res) {
				$("#myModal").modal('show');
				setTimeout(function(){
					$("#myModal").modal('hide');
				}, 2000);
			});
		},
		userData : false,
		setUserData : function(id) {
			this.dataReady = false;
			var req = {
				method : 'POST',
				url : './api.php?func=getUser',
				headers : {},
				data : {'id' : id}
			}
			var self = this;
			$http(req).then(function success(res) {
				self.userData = res.data.data;
			});			
		},
		getUserData : function() {
			return this.userData;
		},
		updateUser : function(userName, id) {
			var req = {
				method : 'POST',
				url : './api.php?func=updateUser',
				headers : {},
				data : {'id' : id, 'name' : userName}
			}
			var self = this;
			$http(req).then(function success(res) {
				$("#myModal").modal('show');
				setTimeout(function(){
					$("#myModal").modal('hide');
				}, 2000);
			});						
		}
	}
}]);