(function () {
    'use strict';

    angular
        .module('app')
        .controller('DepartmentsCtrl', DepartmentsCtrl);

    DepartmentsCtrl.$inject = ['$scope', '$rootScope', '$state', '$timeout', 'departments'];

    function DepartmentsCtrl($scope, $rootScope, $state, $timeout, departments) {
        $scope.$watch('numPerPage', currentPage);
        $scope.$watch('currentPage', currentPage);
        var vm = this;

        angular.extend(vm, {
            init: init,
            currentPage: currentPage,
            numPages: numPages,
            departmentsEditForm: departmentsEditForm,
            departmentsAdd: departmentsAdd,
            goToBack: goToBack,
            goToHead: goToHead,
            departmentsBack: departmentsBack,
            _errorHandler: errorHandler,
			language: $rootScope.language
        });

        $timeout(function () {
            window.scrollTo(0, 0);
        });

        init();

        function init() {
            //vm.title = 'Departments';
            vm.title = 'Отделы';
            vm.sort = 'name';
            vm.departments = departments;
            vm.departmentsFilter = [];

            $scope.currentPage = 1;
            $scope.numPerPage = 10;
            $scope.maxSize = 5;

            $rootScope.myError = false;
            $rootScope.loading = false;
        }

        function currentPage() {
            if (Object.prototype.toString.call(vm.departments) == '[object Array]') {
                var begin = (($scope.currentPage - 1) * $scope.numPerPage);
                var end = parseInt(begin) + parseInt($scope.numPerPage);
                $scope.filteredDepartments = vm.departments.slice(begin, end);
                $scope.totalItems = vm.departments.length;
            }
        }

        function numPages() {
            return Math.ceil(vm.departments.length / $scope.numPerPage);
        }

        function departmentsEditForm(item) {
            $rootScope.loading = true;
            $timeout(function () {
                $state.go('departments-edit', {item: item});
            }, 100);
        }

        function departmentsAdd() {
            $rootScope.loading = true;
            $timeout(function () {
                $state.go('departments-add');
            }, 100);
        }

        function goToBack() {
            $scope.$broadcast('scrollHere');
        }

        function goToHead() {
            $scope.$broadcast('scrollThere');
        }

        function departmentsBack() {
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