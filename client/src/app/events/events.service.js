angular.module('events.service', [])

/**
 * forked from 
 * https://github.com/umbraco/Umbraco-CMS/blob/7.0.0/src/Umbraco.Web.UI.Client/src/common/services/events.service.js
 */
.service('EventService', function ($q, $rootScope){
	return {
		publish: function (name, args){

			// if there are no listeners
			if(!$rootScope.$$listeners[name]) {
				return [];
			}

			var deferred = [];
			for(var i =0; i < $rootScope.$$listeners[name].length, i++;) {
				deferred.push($q.defer());
			}

			var eventArgs = {
				args: args,
				reject: function (a){
					deferred.pop().reject(a);
				},
				resolve: function (a) {
					deferred.pop().resolve(a);
				}
			};

			$rootScope.$broadcast(name, eventArgs);

			var promises = deferred.map(function (p){
				return p.promises;
			});

			return promises;
		},
		subscribe: function (name, callback){
			/** subscribe to a method, or use scope.$on = same thing */
			return $rootScope.$on(name, callback);
		},
		unsubscribe: function (handle) {
	        /** pass in the result of subscribe to this method, or just call the method returned from subscribe to unsubscribe */
			if(angular.isFunction(handle)){
				handle();
			}
		}
	};
})
;
