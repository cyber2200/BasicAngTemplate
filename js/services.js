var dataServices = angular.module('dataServices', ['ngResource']);

dataServices.factory('DataService', ['$http', 'ngToast', function($http, ngToast){
	return {
		getUsersData : function() {
            var req = {
                method : 'POST',
                url : './api.php?func=getData',
                headers : {},
                data : ''
            }
            return $http(req).then(function success(res) {
				return res;
            });
		},
		addUser : function(user){
			var req = {
				method : 'POST',
				url : './api.php?func=addUser',
				headers : {},
				data : user
			}
			var parentObj = this;
			return $http(req).then(function success(res) {
				return res;
			});
		},
		deleteUser : function(id) {
			var req = {
				method : 'POST',
				url : './api.php?func=deleteUser',
				headers : {},
				data : {'id' : id}
			}
			return $http(req).then(function success(res) {
				return res;
			});
		},
		getUserData : function(id) {
			var req = {
				method : 'POST',
				url : './api.php?func=getUser',
				headers : {},
				data : {'id' : id}
			}
			var parentObj = this;
			return $http(req).then(function success(res) {
				return res.data.data;
			});			
		},
		updateUser : function(user) {
			var req = {
				method : 'POST',
				url : './api.php?func=updateUser',
				headers : {},
				data : user
			}
			return $http(req).then(function success(res) {
				return res;
			});						
		}
	}
}]);

dataServices.factory('Validator', function(){
	return {
		validateUserObj : function(user) {
			var err = [];
			// Normalizing
			if (typeof user === 'undefined') {
				user = {'name' : '', 'type' : ''};
			}
			if (typeof user.name === 'undefined') {
				user.name = '';
			}
			if (typeof user.type === 'undefined') {
				user.type = '';
			}
			
			// Validating
			if (user.name == '') {
				err.push('Please enter a user name');
			}
			if (user.type == '') {
				err.push('Please select a type');
			}
			return err;
		}
	}
});
