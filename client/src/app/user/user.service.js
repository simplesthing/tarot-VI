angular.module('user.service', [])

.factory('AuthService', function($http, ENV){
	return {
		login: function (credentials){
			return $http
				.post(ENV.apiEndpoint + 'api/login', credentials)
				.then(function (res){
					console.log(res);
			});
		}
	};
})

.service('Session', function(){
	this.create = function (sessionId, userId, userRole){
		this.id = sessionId;
		this.userId = userId;
		this.userRole = userRole;
	};
	this.destroy = function (){
		this.id = null;
		this.userId = null;
		this.userRole = null;
	};
	return this;
});