var crudControllers = angular.module('crudControllers', []);

crudControllers.controller('ShowCtrl', ['$scope', '$interval', 'DataService', 'ngToast', function($scope, $interval, DataService, ngToast) {
	NProgress.start();
	var currentData = [];
	var newData = [];
	DataService.getUsersData().then(function(res) {
		NProgress.done();
		currentData = res.data;
		$scope.data = JSON.parse(JSON.stringify(currentData));
	}, function(res) {
		NProgress.done();
		ngToast.create("Something went terribly wrong...");
	});

	var interval = $interval(function(){
		DataService.getUsersData().then(function(res) {
			newData = res.data;
			if (JSON.stringify(newData) !== JSON.stringify(currentData)) {
				currentData =  res.data;
				$scope.data = JSON.parse(JSON.stringify(currentData));
			}
		}, function(res) {
			if (res.status != '200') {
				ngToast.create("Something went terribly wrong... Please try to refresh");
			}
		});
	}, 1000);

	$scope.edit = function(id) {
		window.location = '#/edit/' + id;
	}

	$scope.delete = function(id) {
		NProgress.start();
		DataService.deleteUser(id).then(function(res) {
			NProgress.done();			
			ngToast.create('User has been deleted');
		}, function (res) {
			NProgress.done();
			ngToast.create("Error!!!  can't delete, please try again!");
		});
	}

	$scope.$on("$destroy", function(event) {
		$interval.cancel(interval);
    });
}]);

crudControllers.controller('AddCtrl', ['$scope', '$http', '$interval', 'DataService', 'Validator', 'ngToast', function($scope, $http, $interval, DataService, Validator, ngToast) {
	$("#user-input").focus();
	$scope.upsert = function(user) {
		$scope.checker = 0;
		var err = Validator.validateUserObj(user);
		
		if (err.length != 0) {
			var html = '';
			for (var i = 0; i < err.length; i++) {
				html += err[i] + '<br>';
			}
			ngToast.create(html);
		} else {
			$("#user-input").prop('disabled', true);
			$scope.msg = 'Processing...';
			NProgress.start();
			DataService.addUser(user).then(function(res) {
				NProgress.done();
				ngToast.create('User has been added');
				$scope.msg = 'Done';
				$scope.user.name = '';
				$scope.user.type = '';
				$("#user-input").prop('disabled', false);
				$("#user-input").focus();
			}, function(res) {
				ngToast.create("Can't add user. Please try again");
				NProgress.done();		
			});
		}
	}
}]);

crudControllers.controller('EditCtrl', ['$scope', 'DataService', '$routeParams', '$interval', 'Validator', 'ngToast', function($scope, DataService, $routeParams, $interval, Validator, ngToast) {
	NProgress.start();
	$("#user-input").prop('disabled', true);

	$scope.userData = DataService.getUserData($routeParams.id).then(function(res) {
		NProgress.done();
		$("#user-input").prop('disabled', false);
		$scope.user = res;
		$("#user-input").focus();
	}, function(res) {
		ngToast.create("Can't load user data. Please try to refresh.");		
	});

	$scope.upsert = function(user) {
		var err = Validator.validateUserObj(user);
		if (err.length != 0) {
			var html = '';
			for (var i = 0; i < err.length; i++) {
				html += err[i] + '<br>';
			}
			ngToast.create(html);
		} else { 
			NProgress.start();
			$("#user-input").prop('disabled', true);
			DataService.updateUser(user).then(function(res){
				$("#user-input").prop('disabled', false);	
				NProgress.done();					
				ngToast.create("User has been updated");
			}, function(res) {
				NProgress.done();
				ngToast.create("Can't update. Please try again.");		
			});	
		}
	}
}]);
