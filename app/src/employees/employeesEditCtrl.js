(function () {
    'use strict';

    angular
        .module('app')
        .controller('EmployeesEditCtrl', EmployeesEditCtrl);

    EmployeesEditCtrl.$inject = ['$state', '$rootScope', '$filter', '$timeout', 'EmployeesService', 'EmployeesLocalStorage', '$stateParams'];

    function EmployeesEditCtrl($state, $rootScope, $filter, $timeout, EmployeesService, EmployeesLocalStorage, $stateParams) {
        var vm = this;

        angular.extend(vm, {
            init: init,
            employeesSubmit: employeesSubmit,
            _editItem: editItem,
            employeesDialog: employeesDialog,
            employeesEditBack: employeesEditBack,
            _errorHandler: errorHandler
        });

        angular.extend(vm, $stateParams.item);
		
        $timeout(function () {
            window.scrollTo(0, 0);
        });
		
        init();

        function init() {
            if ($stateParams.item.name == undefined) {
                $state.go('employees');
            }
            vm.total = $filter('number')(vm.sum, 2);
            $rootScope.loading = false;
        }

        function employeesSubmit() {
            if (vm.form.$invalid) {
                return;
            }

            $rootScope.loading = true;
            $rootScope.myError = false;

            var item = {
                id: vm.id,
                name: vm.name,
                address: vm.address,
                phone: vm.phone,
                sum: vm.sum,
                description: vm.description
            };
            if ($rootScope.mode == 'ON-LINE (Heroku)') {
                EmployeesService.editItem(item)
                    .then(function () {
                        editItem(item);
                        $rootScope.myError = false;
                        $state.go('employees');
                    })
                    .catch(errorHandler);
            } else {
                EmployeesLocalStorage.editItem(item);
                $rootScope.loading = true;
                $timeout(function () {
                    $state.go('employees');
                }, 100);
            }
        }

        function editItem(item) {
            var employees = EmployeesService.employees;
            for (var i = 0; i < employees.length; i++) {
                if (employees[i].id == item.id) {
                    employees.splice(i, 1, item);
                    break;
                }
            }
        }

        function employeesDialog() {
            var obj = {
                id: vm.id,
                name: vm.name
            };
            $rootScope.loading = true;
            $timeout(function () {
                $state.go('employees-dialog', {item: obj});
            }, 100);
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