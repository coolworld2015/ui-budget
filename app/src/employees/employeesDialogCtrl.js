(function () {
    'use strict';

    angular
        .module('app')
        .controller('EmployeesDialogCtrl', EmployeesDialogCtrl);

    EmployeesDialogCtrl.$inject = ['$state', '$rootScope', '$timeout', 'EmployeesService', 'EmployeesLocalStorage', '$stateParams'];

    function EmployeesDialogCtrl($state, $rootScope, $timeout, EmployeesService, EmployeesLocalStorage, $stateParams) {
        var vm = this;

        angular.extend(vm, {
            init: init,
            employeesDelete: employeesDelete,
            _deleteItem: deleteItem,
            employeesEditBack: employeesEditBack,
			_errorHandler: errorHandler
        });

        angular.extend(vm, $stateParams.item);
		
        $timeout(function () {
            window.scrollTo(0, 0);
        });
		
        init();

        function init() {
            if ($stateParams.item.id == undefined) {
                $state.go('employees');
            }
            $rootScope.loading = false;
        }

        function employeesDelete() {
			$rootScope.loading = true;
            $rootScope.myError = false;
			
			if ($rootScope.mode == 'ON-LINE (Heroku)') {
				EmployeesService.deleteItem(vm.id)
					.then(function () {
                        deleteItem(vm.id);
                        $rootScope.myError = false;
						$state.go('employees');
					})
					.catch(errorHandler);
			} else {
                EmployeesLocalStorage.deleteItem(vm.id);
                $rootScope.loading = true;
                $timeout(function () {
                    $state.go('employees');
                }, 100);
            }
        }

        function deleteItem(id) {
            var employees = EmployeesService.employees;
            for (var i = 0; i < employees.length; i++) {
                if (employees[i].id == id) {
                    employees.splice(i, 1);
                    break;
                }
            }
        }

        function employeesEditBack() {
            $rootScope.loading = true;
            $timeout(function () {
                $state.go('employees');
            }, 100);
        }
		
		function errorHandler() {
            $rootScope.loading = false;
            $rootScope.myError = true;
        }
    }
})();