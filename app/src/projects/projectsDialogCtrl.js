(function () {
    'use strict';

    angular
        .module('app')
        .controller('ProjectsDialogCtrl', ProjectsDialogCtrl);

    ProjectsDialogCtrl.$inject = ['$state', '$rootScope', '$timeout', 'ProjectsService', 'ProjectsLocalStorage', '$stateParams'];

    function ProjectsDialogCtrl($state, $rootScope, $timeout, ProjectsService, ProjectsLocalStorage, $stateParams) {
        var vm = this;

        angular.extend(vm, {
            init: init,
            projectsDelete: projectsDelete,
            _deleteItem: deleteItem,
            projectsEditBack: projectsEditBack,
			_errorHandler: errorHandler,
			language: $rootScope.language
        });

        angular.extend(vm, $stateParams.item);
		
        $timeout(function () {
            window.scrollTo(0, 0);
        });
		
        init();

        function init() {
            if ($stateParams.item.id == undefined) {
                $state.go('projects');
            }
            $rootScope.loading = false;
        }

        function projectsDelete() {
			$rootScope.loading = true;
            $rootScope.myError = false;
			
			if ($rootScope.mode == 'ON-LINE (Heroku)') {
				ProjectsService.deleteItem(vm.id)
					.then(function () {
                        deleteItem(vm.id);
                        $rootScope.myError = false;
						$state.go('projects');
					})
					.catch(errorHandler);
			} else {
                ProjectsLocalStorage.deleteItem(vm.id);
                $rootScope.loading = true;
                $timeout(function () {
                    $state.go('projects');
                }, 100);
            }
        }

        function deleteItem(id) {
            var projects = ProjectsService.projects;
            for (var i = 0; i < projects.length; i++) {
                if (projects[i].id == id) {
                    projects.splice(i, 1);
                    break;
                }
            }
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