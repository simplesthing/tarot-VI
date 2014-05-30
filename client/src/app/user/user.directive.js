angular.module('user.directive', [])

.directive('login', function ( $modal, $rootScope ){
	return {
		restrict: 'A',
		template: '<span class="si-icon si-icon-smiley si-icon-reverse user" data-icon-name="smiley"></span>',
		replace: true,
		link: function (scope, elem, attr){

			var smiley = new SvgIcon( document.querySelector('.si-icon-smiley'), svgIconConfig, { evtoggle: 'svgEvent', size : { w : 32, h : 32 }});

			$rootScope.$on('svgEvent', function (){
				smiley.toggle(true);
				smiley.options.onToggle();
			});

			elem.bind('click', function (){
				var modal = $modal.open({
					templateUrl: 'user/login-form.tpl.html',
					size: 'sm',
					windowClass: 'login-modal',
					controller : function ($scope, $rootScope, AUTH_EVENTS, AuthService, $modalInstance){
						$scope.credentials = {};
	
						$scope.login = function (){
							AuthService.login($scope.credentials).then(function (){
								$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
								$modalInstance.close();
								$scope.$emit('svgEvent');
							}, function (){
								$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
							});
						};
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