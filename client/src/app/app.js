angular.module('tarot', [
	'templates-app',
  	'templates-common',
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

.controller ('AppController', function AppController ($scope, $location) {

	$scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromParams){
		if(angular.isDefined(toState.data.pageTitle)) {
			$scope.pageTitle = toState.data.pageTitle + ' | Tarot VI';
		}
	});

});
