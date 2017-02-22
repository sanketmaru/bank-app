'use strict';
angular.module('Dashboard', [
	'ui.router',
	'ui.grid',
	'ui.grid.expandable', 
	'ui.grid.selection',
	'ui.grid.edit', 
	'ui.grid.cellNav',
	'CustomerModule',
	'MessageModule',
	]).config(['$urlRouterProvider','$stateProvider',
  function($urlRouterProvider, $stateProvider) {

    $urlRouterProvider.otherwise("/bank");

	  $stateProvider
	    .state('bank', {
	      url: "/bank",
	      templateUrl: "templates/bank.html",
	      controller: "BankCtrl"
	    })
	    .state('address', {
	      url: "/address",
				templateUrl: "templates/bank.html",
	      controller: "BankCtrl"
	    });
  }
]);
