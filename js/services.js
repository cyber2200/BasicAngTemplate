var dataServices = angular.module('dataServices', ['ngResource']);

dataServices.factory('DataService', ['$http', 'ngToast', function($http, ngToast){
	return {
		usersData : false,
		getUsersData : function() {
            var req = {
                method : 'POST',
                url : './api.php?func=getData',
                headers : {},
                data : ''
            }
            var parentObj = this;
            $http(req).then(function success(res) {
                parentObj.usersData = res;
            });
			return parentObj.usersData;
		},
		done : false,
		addUser : function(user){
			this.done = false;
			var req = {
				method : 'POST',
				url : './api.php?func=addUser',
				headers : {},
				data : user
			}
			var parentObj = this;
			NProgress.start();
			$http(req).then(function success(res) {
				NProgress.done(); 
				ngToast.create('User has been added');
				parentObj.done = true;
			});
		},
		isDone : function() {
			return this.done;
		},
		deleteUser : function(id) {
			NProgress.start();
			this.done = false;
			var req = {
				method : 'POST',
				url : './api.php?func=deleteUser',
				headers : {},
				data : {'id' : id}
			}
			$http(req).then(function success(res) {
				NProgress.done();
				ngToast.create('User has been deleted');
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
			var parentObj = this;
			$http(req).then(function success(res) {
				parentObj.userData = res.data.data;
			});			
		},
		getUserData : function() {
			return this.userData;
		},
		updateUser : function(user) {
			NProgress.start();
			$("#user-input").prop('disabled', true);
			var req = {
				method : 'POST',
				url : './api.php?func=updateUser',
				headers : {},
				data : user
			}
			$http(req).then(function success(res) {
				NProgress.done();
				ngToast.create('User has been updated');
				$("#user-input").prop('disabled', false);
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
