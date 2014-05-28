angular.module('user', [])

.factory('AuthService', function($http){
	return {
		login: function (credentials){
			return $http
				.post('api/login', credentials)
				.then(function (res){
					console.log(res);
				});
		}
	};
})

.directive('login', function ( $modal ){
	return {
		restrict: 'A',
		template: '<span class="user unknown"></span>',
		link: function (scope, elem, attr){

			elem.bind('click', function (){
				var modal = $modal.open({
					templateUrl: 'login/login-form.tpl.html',
					size: 'sm',
					controller: function ($scope, $modalInstance, AUTH_EVENTS){
						$scope.credentials = {
							email: '',
							password: ''
						};
						$scope.login = function (credentials){

						};
					}
				});
			});

		}
	};
});
