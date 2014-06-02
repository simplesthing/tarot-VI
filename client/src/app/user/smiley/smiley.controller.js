angular.module('smiley.controller', [])

.controller('SmileyController', function ($scope, EventService){
	var smiley = new SvgIcon( document.querySelector('.si-icon-smiley'), svgIconConfig, { evtoggle: 'svgEvent', size : { w : 32, h : 32 }});
			
	$scope.$on('smiley-toggle', function (){
		smiley.toggle(true);
		smiley.options.onToggle();
	});
	
	EventService.subscribe('user-authorized', function (){
		$scope.$emit('smiley-toggle');
	});

	EventService.subscribe('user-unauthorized', function (){
		$scope.$emit('smiley-toggle');
	});

	
});