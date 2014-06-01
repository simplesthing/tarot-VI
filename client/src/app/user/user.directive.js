angular.module('user.directive', [])

.directive('login', function ( $modal, $rootScope, Auth ){
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

			$rootScope.$on('user-authorized', function (){
				scope.$emit('svgEvent');
			});


			elem.bind('click', function (){
				var modal = $modal.open({
					templateUrl: 'user/login-form.tpl.html',
					size: 'sm',
					windowClass: 'login-modal',
					controller : function ($scope, Auth, $modalInstance, $location){
						$scope.credentials = {};


						$scope.login = function (){

							Auth.login('password', {
								'email': $scope.credentials.email,
								'password': $scope.credentials.password
							}, function (err){
								$scope.errors = {};

								if(!err) {
									$modalInstance.close();
									$scope.$emit('svgEvent');
								} else {
									console.log(err);
								}
							});
						};


						$scope.register = function (){
							Auth.createUser({
								email: $scope.credentials.email,
          						username: $scope.credentials.username,
          						password: $scope.credentials.password
							}, function (err){
								if(!err) {
									// $location.path('/');
									$modalInstance.close();
								} else {
									console.log(err);
								}
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