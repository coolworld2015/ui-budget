(function () {
    'use strict';

    angular
        .module('app')
        .controller('EmployeesAddCtrl', EmployeesAddCtrl);

    EmployeesAddCtrl.$inject = ['$state', '$rootScope', '$timeout', 'departments', 'EmployeesService', 'EmployeesLocalStorage'];

    function EmployeesAddCtrl($state, $rootScope, $timeout, departments, EmployeesService, EmployeesLocalStorage) {
        var vm = this;
        
		var optionalDepartment = {name: 'Select department'};
		
        angular.extend(vm, {
            init: init,
			updateChangeDepartment: updateChangeDepartment,
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
			
            vm.departments = departments;
            vm.departmentsOptions = [].concat(vm.departments);
console.log(vm.departmentsOptions)
            vm.departmentsOptions.unshift(optionalDepartment);			
console.log(vm.departmentsOptions)
        }
		
        function updateChangeDepartment(item) {
            vm.errorDepartment = false;
            vm.departmentID = item.id;
        }
		
        function employeesAddSubmit() {
			if (vm.selectedDepartment.name == 'Select department') {
                vm.errorDepartment = true;
            }
			
            if (vm.errorDepartment == true) {
                return;
            }
			
            if (vm.form.$invalid) {
                return;
            }
			
            $rootScope.myError = false;
            $rootScope.loading = true;
			
            var item = {
                id: + new Date,
                name: vm.name,
                address: vm.address,
                phone: vm.phone,
                department: vm.selectedDepartment.name,
                departmentID: vm.departmentID,				
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