angular.module('smiley.directive', [])

.directive('smileyIcon', function (EventService){
	return {
		restrict: 'A',
		template: '<span class="si-icon si-icon-smiley si-icon-reverse user" data-icon-name="smiley" ng-controller="SmileyController"></span>'
	}
})
;