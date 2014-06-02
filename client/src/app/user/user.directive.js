angular.module('user.directive', [
	'smiley'
])

.directive('login', function ( $modal, $rootScope, Auth, EventService ){
	return {
		restrict: 'A',
		template: '<div smiley-icon ></div>',
		link: function (scope, elem, attr){
			var state = 'login';
			
			EventService.subscribe('user-authorized', function (){
				state = 'logout';
			});

			EventService.subscribe('user-unauthorized', function (){
				state = 'login';
			});

			elem.bind('click', function (){
				var modal = $modal.open({
					templateUrl: 'user/login-form.tpl.html',
					size: 'sm',
					windowClass: 'login-modal',
					controller: 'UserController',
					resolve: {
						state: function (){
							return state;
						}
					}
				});
			});
		}
	};
})

.directive('simpleSubmit', function ($parse){
	return {
		restrict: 'A',
		require: ['simpleSubmit', '?form'],
		controller: function ($scope){
			this.attempted = false;

			this.setAttempted = function (){
				this.attempted = true;
			};

			var formCtrl = null; 

			this.setFormCtrl = function (ctrl) {
				formCtrl = ctrl;
			};

			this.needsAttention = function (fieldModelCtrl) {
				if(!formCtrl) {return false;}

				if(fieldModelCtrl) {
					return fieldModelCtrl.$invalid && (fieldModelCtrl.$dirty || this.attempted);
				} else {
					return formCtrl && formCtrl.$invalid && (formCtrl.$dirty || this.attempted);
				}
			};

		},
		compile: function (cElem, cAttr, transclude){
			return {	
				pre: function (scope, formEl, attr, ctrls){
					var submitCtrl = ctrls[0];
					var formCtrl = (ctrls.length > 1) ? ctrls[1] : null;
					
					submitCtrl.setFormCtrl(formCtrl);

					scope.simple = scope.simple || {};
					scope.simple[attr.name] = submitCtrl;

				},
				post: function (scope, formEl, attr, ctrls){
					var submitCtrl = ctrls[0];
					var formCtrl = (ctrls.length > 1) ? ctrls[1] : null;
					var fn = $parse(attr.simpleSubmit);

					formEl.bind('submit', function (e){
						submitCtrl.setAttempted();

						if(!scope.$$phase) { scope.$apply(); }
						
						if(!formCtrl.$valid) { return false; }

						scope.$apply(function (){
							fn(scope, {$event: e});
						});
					});
				}
			};
		}
	};
});