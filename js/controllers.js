var testControllers = angular.module('testControllers', []);

testControllers.controller('ShowCtrl', ['$scope', 'Data', '$interval', 'DataService', 'Dialog', function($scope, Data, $interval, DataService, Dialog) {
	NProgress.start();
	setTimeout(function() {
		NProgress.done(); 
		$('.fade').removeClass('out'); 
	}, 200);
	$scope.data = Data.query();
	$interval(function() {
		Data.query(function(ret) {
			$scope.data = ret;
		});
	}, 5000);
	$scope.edit = function(id) {
		window.location = '#/edit/' + id;
	}
	$scope.delete = function(id) {
		DataService.deleteUser(id);
	}
}]);

testControllers.controller('AddCtrl', ['$scope', '$http', '$interval', 'DataService', 'Validator', function($scope, $http, $interval, DataService, Validator) {
	NProgress.start();
	setTimeout(function() { 
		NProgress.done(); 
		$('.fade').removeClass('out'); 
	}, 500);
	$("#user-input").focus();
	$scope.add = function(user) {
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
			$scope.checker = 1;
			$scope.msg = 'Processing...';
			DataService.addUser(user);
			$interval(function() {
				if ($scope.checker == 1) {
					if (DataService.isDone) {
						$scope.msg = 'Done';
						$scope.user.name = '';
						$scope.user.type = '';
						$("#user-input").prop('disabled', false);
						$("#user-input").focus();
						$scope.checker = 0;
					}
				}
			}, 1000);
		}
	}
}]);

testControllers.controller('EditCtrl', ['$scope', 'DataService', '$routeParams', '$interval', 'Validator', function($scope, DataService, $routeParams, $interval, Validator) {
	NProgress.start();
	$("#user-input").prop('disabled', true);
	DataService.setUserData($routeParams.id);
	$scope.checker = true;
	$scope.userName = '';
	$scope.userId = '';
	$interval(function(){
		if ($scope.checker) {
			$scope.userData = DataService.getUserData();
			if ($scope.userData != false) {
				NProgress.done();
				$("#user-input").prop('disabled', false);
				$scope.checker = false;
				$scope.user = $scope.userData;
				$("#user-input").focus();
			}
		}
	}, 1000);
	$scope.update = function(user) {
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
			DataService.updateUser(user);	
		}
	}
}]);
