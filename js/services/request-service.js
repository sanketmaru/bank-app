angular.module('RequestModule', [])
	.service('RequestService', [ '$q', '$http',
	function($q, $http){ 

    /**
    * This is a private function to have common functionality
    * of request handler
    */
		var _requestHandler = function(success, error, deferred){
      var sucessHandler = success || function(deferred) {
        return function(res) {
          deferred.resolve(res);
        };
      };

      var errorHandler = error || function(err) {
        deferred.reject(err);
      };
      return {
      	sucessHandler : sucessHandler,
      	errorHandler : errorHandler
      }
		};

    /**
    * Get the model from the backend
    * @param model
    * @param success handler
    * @param error handler
    */
		this.get = function(url, success, error){
			var deferred = $q.defer();
			var requestHandler = _requestHandler(success, error, deferred);

			$http.get(url)
        .then(requestHandler.sucessHandler(deferred), requestHandler.errorHandler);
      return deferred.promise;
		};

	}]);


