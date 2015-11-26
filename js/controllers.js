var testControllers = angular.module('testControllers', []);

testControllers.controller('ShowCtrl', ['$scope', 'Data', '$interval', 'DataService', function($scope, Data, $interval, DataService) {
	$scope.data = Data.query();
	$interval(function() {
		Data.query(function(ret) {
			$scope.data = ret;
		});	
	}, 3000);
}]);

testControllers.controller('AddCtrl', ['$scope', '$http', '$interval', 'DataService', function($scope, $http, $interval, DataService) {
	$scope.update = function(user) {
		$scope.checker = 0;
		if(typeof user === 'undefined'){
			$scope.msg = 'Please select a user name';
		} else if (typeof user.name === 'undefined') {
			$scope.msg = 'Please select a user name';
		}else {
			$scope.checker = 1;
			$scope.msg = 'Processing...';
			DataService.addUser(user.name);
			$interval(function() {
				if ($scope.checker == 1) {
					if (DataService.isDone) {
						$scope.msg = 'Done';
						$scope.checker == 0;
					}
				}
			}, 1000);
		}
	}
}]);
