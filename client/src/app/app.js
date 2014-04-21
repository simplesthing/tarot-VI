angular.module('tarot', [
	'templates-app',
  	'templates-common',
	'tarot.home',
	'ui.router'
])
.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  
  $urlRouterProvider.otherwise( '/home' );
})

.run( function run () {
})

.controller ('AppController', function AppController ($scope, $location) {
	$scope.$on('$statsChangeSuccess', function (event, toState, toParams, fromParams){
		if(angular.isDefined(toState.data.pageTitle)) {
			$scope.pageTitle = toState.data.pageTitle + ' | Tarot VI';
		}
	});

});
