var crudControllers = angular.module('crudControllers', []);

crudControllers.controller('ShowCtrl', ['$scope', '$interval', 'DataService', 'ngToast', function($scope, $interval, DataService, ngToast) {
	
	var currentData = [];
	var newData = [];
	DataService.getUsersData().then(function(res) {
		currentData = res.data;
		$scope.data = JSON.parse(JSON.stringify(currentData));
	});

	var interval = $interval(function(){
		DataService.getUsersData().then(function(res) {
			newData = res.data;
			if (JSON.stringify(newData) !== JSON.stringify(currentData)) {
				currentData =  res.data;
				$scope.data = JSON.parse(JSON.stringify(currentData));
				console.log('New');
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
		});
	}

	$scope.$on("$destroy", function(event) {
		$interval.cancel(interval);
    });
}]);

crudControllers.controller('AddCtrl', ['$scope', '$http', '$interval', 'DataService', 'Validator', 'ngToast', function($scope, $http, $interval, DataService, Validator, ngToast) {
	NProgress.start();
	setTimeout(function() { 
		NProgress.done(); 
	}, 500);
	$("#user-input").focus();
	$scope.upsert = function(user) {
		$scope.checker = 0;
		var err = Validator.validateUserObj(user);
		
		if (err.length != 0) {
			var html = '';
			for (var i = 0; i < err.length; i++) {
				html += err[i] + '<br>';
			}
			$("#modalTxt").html(html);
			$("#myModal").modal('show');
			setTimeout(function(){
				$("#myModal").modal('hide');
			}, 2000);			
		} else {
			$("#user-input").prop('disabled', true);
			$scope.msg = 'Processing...';
			NProgress.start();
			DataService.addUser(user).then(function(res) {
				NProgress.done();
				ngToast.create('User has been added');
				console.log(res);
				$scope.msg = 'Done';
				$scope.user.name = '';
				$scope.user.type = '';
				$("#user-input").prop('disabled', false);
				$("#user-input").focus();
			});
		}
	}
}]);

crudControllers.controller('EditCtrl', ['$scope', 'DataService', '$routeParams', '$interval', 'Validator', function($scope, DataService, $routeParams, $interval, Validator) {
	NProgress.start();
	$("#user-input").prop('disabled', true);
	$scope.userName = '';
	$scope.userId = '';

	$scope.userData = DataService.getUserData($routeParams.id).then(function(res) {
		console.log(res);
		NProgress.done();
		$("#user-input").prop('disabled', false);
		$scope.user = res;
		$("#user-input").focus();
	});

	$scope.upsert = function(user) {
		var err = Validator.validateUserObj(user);
		if (err.length != 0) {
			var html = '';
			for (var i = 0; i < err.length; i++) {
				html += err[i] + '<br>';
			}
			$("#modalTxt").html(html);
			$("#myModal").modal('show');
			setTimeout(function(){
				$("#myModal").modal('hide');
			}, 2000);			
		} else { 
			NProgress.start();
			$("#user-input").prop('disabled', true);
			DataService.updateUser(user).then(function(res){
				$("#user-input").prop('disabled', false);	
				NProgress.done();					
			});	
		}
	}
}]);
