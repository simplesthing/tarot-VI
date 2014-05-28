angular.module('topnav', [
	'user'
])
.directive('topnavBar', function (){
	return {
		restrict:'A',
		templateUrl:'topnav/topnav.tpl.html'
	};
});