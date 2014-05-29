angular.module('user.controller', [])

.controller('LoginFormCtrl', function ($scope, $rootScope, $modalInstance, AUTH_EVENTS, AuthService){
	
	$scope.login = function (credentials){

		if(credentials.$valid === true) {
			console.log("VALID");
			AuthService.login(credentials).then(function (){
				$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
			}, function (){
				$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
			});
		} else {
			console.log("INVALID");
		}
		
	};

});