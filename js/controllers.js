var testControllers = angular.module('testControllers', []);

testControllers.controller('ShowCtrl', ['$scope', 'Data', '$interval', 'DataService', 'DataService1', function($scope, Data, $interval, DataService, DataService1) {
	$scope.data = Data.query();
	$interval(function() {
		Data.query(function(ret) {
			$scope.data = ret;
			DataService1.t1();
		});	
	}, 3000);
}]);

testControllers.controller('AddCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.update = function(user) {
		if(typeof user === 'undefined'){
			$scope.error = 'Please select a user name';
		} else if (typeof user.name === 'undefined') {
			$scope.error = 'Please select a user name';
		}else {
			$scope.error = '';
			var req = {
				method : 'POST',
				url : './api.php?func=addUser',
				headers : {},
				data : {'name' : user.name}
			}
			$http(req).then(function success(res) {
				
			});
		}
	}
}]);
