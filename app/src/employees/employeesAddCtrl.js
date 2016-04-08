(function () {
    'use strict';

    angular
        .module('app')
        .controller('EmployeesAddCtrl', EmployeesAddCtrl);

    EmployeesAddCtrl.$inject = ['$state', '$rootScope', '$timeout', 'EmployeesService', 'EmployeesLocalStorage'];

    function EmployeesAddCtrl($state, $rootScope, $timeout, EmployeesService, EmployeesLocalStorage) {
        var vm = this;

        angular.extend(vm, {
            init: init,
            employeesAddSubmit: employeesAddSubmit,
            _addItem: addItem,
            employeesAddBack: employeesAddBack,
			_errorHandler: errorHandler
        });

		$timeout(function () {
            window.scrollTo(0, 0);
        });
		
        init();

        function init() {
            $rootScope.loading = false;
        }

        function employeesAddSubmit() {
            if (vm.form.$invalid) {
                return;
            }
			
            $rootScope.myError = false;
            $rootScope.loading = true;
			
            var id = (Math.random() * 1000000).toFixed();
            var item = {
                id: id,
                name: vm.name,
                address: vm.address,
                phone: vm.phone,
                description: vm.description,
                sum: 0
            };
			
			if ($rootScope.mode == 'ON-LINE (Heroku)') {
				EmployeesService.addItem(item)
					.then(function () {
                        addItem(item);
						$rootScope.myError = false;
						$state.go('employees');
					})
					.catch(errorHandler);
			} else {
                EmployeesLocalStorage.addItem(item);
                $rootScope.loading = true;
                $timeout(function () {
                    $state.go('employees');
                }, 100);
            }
         }

        function addItem(item) {
            EmployeesService.employees.push(item);
        }

        function employeesAddBack() {
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