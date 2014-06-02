angular.module('tarot', [
	'templates-app',
  	'templates-common',
  	'config',
  	'topnav',
	'home',
	'ngResource',
	'ngCookies',
	'http-auth-interceptor',
	'ui.router',
	'ui.bootstrap',
	'events'
])
.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/home' );
})

.run( function run ($rootScope, $location, Auth, $cookieStore, EventService) {

	Auth.currentUser().then(function (){
		if($rootScope.currentUser._id !== 0) {
			// $rootScope.$broadcast('user-authorized');
			EventService.publish('user-authorized', {});
		} 
   });

})

.controller ('AppController', function AppController ($scope, $rootScope, $location, Auth) {

	$scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromParams){
		if(angular.isDefined(toState.data.pageTitle)) {
			$scope.pageTitle = toState.data.pageTitle + ' | Tarot VI';
		}
	});

});
