angular.module('user.controller', [])

.controller('UserController', function ($scope, $modalInstance, EventService, Auth, state){
	$scope.user = {
		test: "test",
		state: state

	};

	$scope.login = function (user){

		Auth.login('password', {
			'email': $scope.user.email,
			'password': $scope.user.password
		}, function (err){
			$scope.errors = {};

			if(!err) {
				EventService.publish('user-authorized', {});
				$modalInstance.close();
			} else {
				console.log(err);
			}
		});
	};

	$scope.register = function (){
		$scope.user.state = 'register';
	};

	$scope.createUser = function (user){
		Auth.createUser({
			email: $scope.user.email,
				username: $scope.user.username,
				password: $scope.user.password
		}, function (err){
			if(!err) {
				EventService.publish('user-authorized', {});
				$modalInstance.close();
			} else {
				console.log(err);
			}
		});
	};

	$scope.back = function (){
		$scope.user.state = 'login';
	};

	$scope.logout = function (){
		console.log("logout");
		Auth.logout(function (){
			EventService.publish('user-unauthorized', {});
			$modalInstance.close();
		});
	};
	
	$scope.getState = function (state){
		if($scope.user.state === state) {
			return true;
		} else {
			return false;
		}
 	};
	
})
;