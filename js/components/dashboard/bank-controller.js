angular.module('Dashboard')
	.controller('BankCtrl', ['$scope','$state', 'CustomerService','UI_MESSAGE',
		function($scope, $state, CustomerService, Message){

		$scope.currentTab = 'bank';

    $scope.isDropdownOpen = false;

    var isCellEditable = function(cellScope) {
      return cellScope.row.entity.special === "no";
    };

		$scope.bankColumns = [{
      field : 'Settings', 
      enableCellEdit: false, 
      cellTemplate: 'templates/addRecordTemplate.html'
    }, { 
        field: 'name', 
        cellTemplate: 'templates/nameTemplate.html',
        cellEditableCondition :  isCellEditable
    }, { 
        field: 'id', 
        enableCellEdit: false
    }, { 
        field: 'bank',        
        cellEditableCondition :  isCellEditable
    }, { 
        field: 'branch',        
        cellEditableCondition :  isCellEditable
    }, { 
        field: 'city' ,        
        cellEditableCondition :  isCellEditable
    }, { 
        field: 'ifsc',        
        cellEditableCondition :  isCellEditable  
    }, { 
        field: 'comments',        
        cellEditableCondition :  isCellEditable 
    }];

    $scope.addressColumns = [{
      field : 'Settings', 
      enableCellEdit: false, 
      cellTemplate: 'templates/addRecordTemplate.html'
    },{ 
      field: 'name', 
      cellTemplate: 'templates/nameTemplate.html',
      cellEditableCondition :  isCellEditable
    }, { 
      field: 'id', 
      enableCellEdit: false 
    }, { 
      field: 'address1',
      cellEditableCondition :  isCellEditable
    }, { 
      field: 'address2' ,
      cellEditableCondition :  isCellEditable
    }, { 
      field: 'city',
      cellEditableCondition :  isCellEditable
    }, { 
       field: 'pin',
       cellEditableCondition :  isCellEditable
    }, { 
       field: 'comments',
       cellEditableCondition :  isCellEditable 
    }];
    
		$scope.gridOptions = {
        expandableRowTemplate: 'templates/expandableRowTemplate.html',
        expandableRowHeight: 150,				
				enableColumnMenus: true,
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
            gridApi.expandable.on.rowExpandedStateChanged($scope, function (row) {
                if (row.isExpanded) {
                  row.entity.subGridOptions = {
                    columnDefs: [
                    { name: 'name'},
                    { name: 'bank'},
                    { name: 'city'}
                  ]};

                  row.entity.subGridOptions.data = $scope.customers.filter(function(item){
                    return item.id === row.entity.id;
                  });

                }
            });

            gridApi.selection.on.rowSelectionChanged($scope,function(row){
              var removeRowIndex = $scope.gridOptions.data.indexOf(row.entity);
            });
        }
      };			
		
      //$scope.gridOptions.enableCellEditOnFocus = true;
		
    
      if($state.current.name === 'bank') {
        $scope.gridOptions.columnDefs = $scope.bankColumns;  
      } else {
        $scope.gridOptions.columnDefs = $scope.addressColumns;
      }    
   
    $scope.getCustomers = function(){
    	CustomerService.get()
    		.then(function(customers){	
          $scope.customers = customers.data;				
    			$scope.gridOptions.data = customers.data;
    		})
    		.catch(function(err){
    			alert(err.message || Message.ERROR);
    		})
    };

    //initialized
		$scope.getCustomers();

    $scope.changeTab = function(tabName) {
      $state.go(tabName);
    };

    $scope.changeClass = function() {
      $scope.isDropdownOpen = !$scope.isDropdownOpen;
    };

    /**
     * Add a record to expandable grid
     */
		$scope.addRecord = function(row) {
			console.log(row);
		};

    /**
     * Delete the primary record
     */
    $scope.deleteRecord = function(row) {
      var indexToDel = $scope.gridOptions.data.indexOf(row);
      $scope.gridOptions.data.splice(indexToDel, 1)
    };

    $scope.editCell = function(row, col) {
      // col.colDef.enableCellEditOnFocus = true
      // col.colDef.enableCellEdit = true;
      console.log(row);
    };

    
    
	}]);
