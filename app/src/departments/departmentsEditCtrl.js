(function () {
    'use strict';

    angular
        .module('app')
        .controller('DepartmentsEditCtrl', DepartmentsEditCtrl);

    DepartmentsEditCtrl.$inject = ['$state', '$rootScope', '$filter', '$timeout', 'DepartmentsService', 'DepartmentsLocalStorage', '$stateParams'];

    function DepartmentsEditCtrl($state, $rootScope, $filter, $timeout, DepartmentsService, DepartmentsLocalStorage, $stateParams) {
        var vm = this;

        angular.extend(vm, {
            init: init,
            departmentsSubmit: departmentsSubmit,
            _editItem: editItem,
            departmentsDialog: departmentsDialog,
            departmentsEditBack: departmentsEditBack,
            _errorHandler: errorHandler,
			language: $rootScope.language
        });

        angular.extend(vm, $stateParams.item);
		
        $timeout(function () {
            window.scrollTo(0, 0);
        });
		
        init();

        function init() {
            if ($stateParams.item.name == undefined) {
                $state.go('departments');
            }
            vm.total = $filter('number')(vm.sum, 2);
            $rootScope.loading = false;
        }

        function departmentsSubmit() {
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
                DepartmentsService.editItem(item)
                    .then(function () {
                        editItem(item);
                        $rootScope.myError = false;
                        $state.go('departments');
                    })
                    .catch(errorHandler);
            } else {
                DepartmentsLocalStorage.editItem(item);
                $rootScope.loading = true;
                $timeout(function () {
                    $state.go('departments');
                }, 100);
            }
        }

        function editItem(item) {
            var departments = DepartmentsService.departments;
            for (var i = 0; i < departments.length; i++) {
                if (departments[i].id == item.id) {
                    departments.splice(i, 1, item);
                    break;
                }
            }
        }

        function departmentsDialog() {
            var obj = {
                id: vm.id,
                name: vm.name
            };
            $rootScope.loading = true;
            $timeout(function () {
                $state.go('departments-dialog', {item: obj});
            }, 100);
        }

        function departmentsEditBack() {
            $rootScope.loading = true;
            $timeout(function () {
                $state.go('departments');
            }, 100);
        }

        function errorHandler() {
            $rootScope.loading = false;
            $rootScope.myError = true;
        }
    }
})();