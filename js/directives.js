var crudDirectives = angular.module('crudDirectives', []);
crudDirectives.directive('crudUserForm', function(){
	return {
		restrict : 'E',
		templateUrl : 'templates/userForm.html'
	}
});
crudDirectives.directive('crudTest', function(){
	return {
		restrict : 'E',
		templateUrl : 'templates/test.html',
		'controller' : function(ngToast) {
			this.test = 'Test111';
			this.test1 = function() {
				ngToast.create('Just a test...');
			}
		},
		'controllerAs' : 'testCtrl'
	}
});