var crudDirectives = angular.module('crudDirectives', []);
crudDirectives.directive('crudUserForm', function(){
	return {
		restrict : 'E',
		templateUrl : 'templates/userForm.html'
	}
});
