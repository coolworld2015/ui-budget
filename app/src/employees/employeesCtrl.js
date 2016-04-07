(function () {
    'use strict';

    angular
        .module('app')
        .controller('EmployeesCtrl', EmployeesCtrl);

    EmployeesCtrl.$inject = ['$scope', '$rootScope', '$state', '$timeout', 'employees'];

    function EmployeesCtrl($scope, $rootScope, $state, $timeout, employees) {
        $scope.$watch('numPerPage', currentPage);
        $scope.$watch('currentPage', currentPage);
        var vm = this;

        angular.extend(vm, {
            init: init,
            currentPage: currentPage,
            numPages: numPages,
            employeesEditForm: employeesEditForm,
            employeesAdd: employeesAdd,
            goToBack: goToBack,
            goToHead: goToHead,
            employeesBack: employeesBack,
            _errorHandler: errorHandler
        });

        $timeout(function () {
            window.scrollTo(0, 0);
        });

        init();

        function init() {
            vm.title = 'Employees';
            vm.sort = 'name';
            vm.employees = employees;
            vm.employeesFilter = [];

            $scope.currentPage = 1;
            $scope.numPerPage = 10;
            $scope.maxSize = 5;

            $rootScope.myError = false;
            $rootScope.loading = false;
        }

        function currentPage() {
            if (Object.prototype.toString.call(vm.employees) == '[object Array]') {
                var begin = (($scope.currentPage - 1) * $scope.numPerPage);
                var end = parseInt(begin) + parseInt($scope.numPerPage);
                $scope.filteredEmployees = vm.employees.slice(begin, end);
                $scope.totalItems = vm.employees.length;
            }
        }

        function numPages() {
            return Math.ceil(vm.employees.length / $scope.numPerPage);
        }

        function employeesEditForm(item) {
            $rootScope.loading = true;
            $timeout(function () {
                $state.go('employees-edit', {item: item});
            }, 100);
        }

        function employeesAdd() {
            $rootScope.loading = true;
            $timeout(function () {
                $state.go('employees-add');
            }, 100);
        }

        function goToBack() {
            $scope.$broadcast('scrollHere');
        }

        function goToHead() {
            $scope.$broadcast('scrollThere');
        }

        function employeesBack() {
            $rootScope.loading = true;
            $timeout(function () {
                $state.go('main');
            }, 100);
        }

        function errorHandler() {
            $rootScope.loading = false;
            $rootScope.myError = true;
        }
    }
})();