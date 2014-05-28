angular.module('tarot', [
	'templates-app',
  	'templates-common',
  	'config',
	'home',
	'topnav',
	'ui.router',
	'ui.bootstrap'
])
.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/home' );
})

.run( function run () {
})

.constant('AUTH_EVENTS', {
	loginSuccess: 'auth-login-success',
	loginFailed: 'auth-login-failed',
	logoutSuccess: 'auth-logout-success',
	sessionTimeout: 'auth-session-timeout',
	notAuthenticated: 'auth-not-authenticated',
	notAuthorized: 'auth-not-authorized'
})

.constant('USER_ROLES', {
	all: '*',
	admin: 'admin',
	user: 'user'
})

.controller ('AppController', function AppController ($scope, $location) {

	$scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromParams){
		if(angular.isDefined(toState.data.pageTitle)) {
			$scope.pageTitle = toState.data.pageTitle + ' | Tarot VI';
		}
	});

});
