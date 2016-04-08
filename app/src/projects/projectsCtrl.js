(function () {
    'use strict';

    angular
        .module('app')
        .controller('ProjectsCtrl', ProjectsCtrl);

    ProjectsCtrl.$inject = ['$scope', '$rootScope', '$state', '$timeout', 'projects'];

    function ProjectsCtrl($scope, $rootScope, $state, $timeout, projects) {
        $scope.$watch('numPerPage', currentPage);
        $scope.$watch('currentPage', currentPage);
        var vm = this;

        angular.extend(vm, {
            init: init,
            currentPage: currentPage,
            numPages: numPages,
            projectsEditForm: projectsEditForm,
            projectsAdd: projectsAdd,
            goToBack: goToBack,
            goToHead: goToHead,
            projectsBack: projectsBack,
            _errorHandler: errorHandler
        });

        $timeout(function () {
            window.scrollTo(0, 0);
        });

        init();

        function init() {
            vm.title = 'Projects';
            vm.sort = 'name';
            vm.projects = projects;
            vm.projectsFilter = [];

            $scope.currentPage = 1;
            $scope.numPerPage = 10;
            $scope.maxSize = 5;

            $rootScope.myError = false;
            $rootScope.loading = false;
        }

        function currentPage() {
            if (Object.prototype.toString.call(vm.projects) == '[object Array]') {
                var begin = (($scope.currentPage - 1) * $scope.numPerPage);
                var end = parseInt(begin) + parseInt($scope.numPerPage);
                $scope.filteredClients = vm.projects.slice(begin, end);
                $scope.totalItems = vm.projects.length;
            }
        }

        function numPages() {
            return Math.ceil(vm.projects.length / $scope.numPerPage);
        }

        function projectsEditForm(item) {
            $rootScope.loading = true;
            $timeout(function () {
                $state.go('projects-edit', {item: item});
            }, 100);
        }

        function projectsAdd() {
            $rootScope.loading = true;
            $timeout(function () {
                $state.go('projects-add');
            }, 100);
        }

        function goToBack() {
            $scope.$broadcast('scrollHere');
        }

        function goToHead() {
            $scope.$broadcast('scrollThere');
        }

        function projectsBack() {
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