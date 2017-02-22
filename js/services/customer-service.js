angular.module('CustomerModule', ['RequestModule'])
	.service('CustomerService', ['RequestService',
	function(RequestService){

		/**
		* Adds the customer to the backend
		* @param customer model
		*/
		this.add = function(customer){
			
		};

		/**
		* Get all the customers from the backend
		*/
		this.get = function(){
			return RequestService.get('customers.json');
		};

		/**
		* Updates the customers to the backend
		* @param customer model
		*/
		this.update = function(customer){
			
		};		

	}]);
