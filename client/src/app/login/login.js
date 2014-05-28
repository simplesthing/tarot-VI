angular.module('user', [])

.directive('login', function ( $modal ){
	return {
		restrict: 'A',
		template: '<span class="user unknown"></span>',
		link: function (scope, elem, attr){

			elem.bind('click', function (){
				var modal = $modal.open({
					templateUrl: 'login/login-form.tpl.html',
					size: 'sm',
					controller: function ($scope, $modalInstance){
						$scope.credentials = {
							email: '',
							password: ''
						};
						$scope.login = function (credentials){
							console.log(credentials);
						};
					}
				});
			});

		}
	};
});
