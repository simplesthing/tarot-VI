/**
 * Each section of the site has its own module.  Within
 * `src/app/home`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take care of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
 angular.module('tarot.home', [
 	'ui.router'
 ])
 /**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config($stateProvider){
	$stateProvider.state('home', {
		url: '/home',
		views: {
			"main": {
				controller: 'HomeController',
				templateUrl: 'home/home.tpl.html'
			}
		},
		data: {pageTitle: 'Home'}
	});
})

.controller( 'HomeController', function HomeController( $scope ) {

});