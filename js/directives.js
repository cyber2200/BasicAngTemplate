var crudDirectives = angular.module('crudDirectives', []);
crudDirectives.directive('crudUserForm', function(){
	return {
		templateUrl : 'templates/userForm.html'
	}
});