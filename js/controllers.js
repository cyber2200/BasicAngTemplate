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

testControllers.controller('AddCtrl', ['$scope', '$http', '$interval', 'DataService', function($scope, $http, $interval, DataService) {
	NProgress.start();
	setTimeout(function() { 
		NProgress.done(); 
		$('.fade').removeClass('out'); 
	}, 500);
	$("#user-input").focus();
	$scope.update = function(user) {
		$scope.checker = 0;
		if(typeof user === 'undefined'){
			$scope.msg = 'Please select a user name';
			$("#myModal").modal('show');
			setTimeout(function(){
				$("#myModal").modal('hide');
			}, 2000);
		} else if (typeof user.name === 'undefined') {
			$scope.msg = 'Please select a user name';
			$("#myModal").modal('show');
			setTimeout(function(){
				$("#myModal").modal('hide');
			}, 2000);
		}else {
			$("#user-input").prop('disabled', true);
			$scope.checker = 1;
			$scope.msg = 'Processing...';
			DataService.addUser(user.name);
			$interval(function() {
				if ($scope.checker == 1) {
					if (DataService.isDone) {
						$scope.msg = 'Done';
						$scope.user.name = '';
						$("#user-input").prop('disabled', false);
						$("#user-input").focus();
						$scope.checker = 0;
					}
				}
			}, 1000);
		}
	}
}]);

testControllers.controller('EditCtrl', ['$scope', 'DataService', '$routeParams', '$interval', function($scope, DataService, $routeParams, $interval) {
	NProgress.start();
	$("#user-input").prop('disabled', true);
	$scope.msg = 'Loading...';
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
				$scope.userName = $scope.userData.name;
				$scope.userId = $scope.userData.id;
				$("#user-input").focus();
			}
		}
	}, 1000);
	$scope.update = function(userName, id) {
		if(typeof userName === 'undefined'){
			$scope.msg = 'Please select a user name';
			$("#myModal").modal('show');
			setTimeout(function(){
				$("#myModal").modal('hide');
			}, 2000);
		} else if(userName === '') {
			$scope.msg = 'Please select a user name';
			$("#myModal").modal('show');
			setTimeout(function(){
				$("#myModal").modal('hide');
			}, 2000);		
		} else {
			$scope.msg = 'Done';
			DataService.updateUser(userName, id);
		}
	}
}]);
