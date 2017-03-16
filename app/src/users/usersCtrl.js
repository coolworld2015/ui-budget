(function () {
    'use strict';

    angular
        .module('app')
        .controller('UsersCtrl', UsersCtrl);

    UsersCtrl.$inject = ['$scope', '$rootScope', '$state', '$timeout', 'users'];

    function UsersCtrl($scope, $rootScope, $state, $timeout, users) {
        $scope.$watch('numPerPage', currentPage);
        $scope.$watch('currentPage', currentPage);
        var vm = this;

        angular.extend(vm, {
            init: init,
            currentPage: currentPage,
            usersEditForm: usersEditForm,
            usersAdd: usersAdd,
            goToBack: goToBack,
            goToHead: goToHead,
            usersBack: usersBack,
            _errorHandler: errorHandler,
			language: $rootScope.language
        });

        $timeout(function () {
            window.scrollTo(0, 0);
        });

        init();

        function init() {
            vm.title = 'Users';
            vm.users = users;
            vm.usersFilter = [];

            $scope.currentPage = 1;
            $scope.numPerPage = 10;
            $scope.maxSize = 5;

            $rootScope.myError = false;
            $rootScope.loading = false;
        }

        function currentPage() {
            if (Object.prototype.toString.call(vm.users) == '[object Array]') {
                var begin = (($scope.currentPage - 1) * $scope.numPerPage);
                var end = parseInt(begin) + parseInt($scope.numPerPage);
                $scope.filteredUsers = vm.users.slice(begin, end);
                $scope.totalItems = vm.users.length;
            }
        }

        function usersEditForm(item) {
            $rootScope.loading = true;
            $timeout(function () {
                $state.go('users-edit', {item: item});
            }, 100);
        }

        function usersAdd() {
            $rootScope.loading = true;
            $timeout(function () {
                $state.go('users-add');
            }, 100);
        }

        function goToBack() {
            $scope.$broadcast('scrollHere');
        }

        function goToHead() {
            $scope.$broadcast('scrollThere');
        }

        function usersBack() {
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