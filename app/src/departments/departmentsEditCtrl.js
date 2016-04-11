(function () {
    'use strict';

    angular
        .module('app')
        .controller('ProjectsEditCtrl', ProjectsEditCtrl);

    ProjectsEditCtrl.$inject = ['$state', '$rootScope', '$filter', '$timeout', 'ProjectsService', 'ProjectsLocalStorage', '$stateParams'];

    function ProjectsEditCtrl($state, $rootScope, $filter, $timeout, ProjectsService, ProjectsLocalStorage, $stateParams) {
        var vm = this;

        angular.extend(vm, {
            init: init,
            projectsSubmit: projectsSubmit,
            _editItem: editItem,
            projectsDialog: projectsDialog,
            projectsEditBack: projectsEditBack,
            _errorHandler: errorHandler
        });

        angular.extend(vm, $stateParams.item);
		
        $timeout(function () {
            window.scrollTo(0, 0);
        });
		
        init();

        function init() {
            if ($stateParams.item.name == undefined) {
                $state.go('projects');
            }
            vm.total = $filter('number')(vm.sum, 2);
            $rootScope.loading = false;
        }

        function projectsSubmit() {
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
                ProjectsService.editItem(item)
                    .then(function () {
                        editItem(item);
                        $rootScope.myError = false;
                        $state.go('projects');
                    })
                    .catch(errorHandler);
            } else {
                ProjectsLocalStorage.editItem(item);
                $rootScope.loading = true;
                $timeout(function () {
                    $state.go('projects');
                }, 100);
            }
        }

        function editItem(item) {
            var projects = ProjectsService.projects;
            for (var i = 0; i < projects.length; i++) {
                if (projects[i].id == item.id) {
                    projects.splice(i, 1, item);
                    break;
                }
            }
        }

        function projectsDialog() {
            var obj = {
                id: vm.id,
                name: vm.name
            };
            $rootScope.loading = true;
            $timeout(function () {
                $state.go('projects-dialog', {item: obj});
            }, 100);
        }

        function projectsEditBack() {
            $rootScope.loading = true;
            $timeout(function () {
                $state.go('projects');
            }, 100);
        }

        function errorHandler() {
            $rootScope.loading = false;
            $rootScope.myError = true;
        }
    }
})();