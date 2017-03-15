(function () {
    'use strict';

    angular
        .module('app')
        .controller('ProjectsAddCtrl', ProjectsAddCtrl);

    ProjectsAddCtrl.$inject = ['$state', '$rootScope', '$timeout', 'ProjectsService', 'ProjectsLocalStorage'];

    function ProjectsAddCtrl($state, $rootScope, $timeout, ProjectsService, ProjectsLocalStorage) {
        var vm = this;

        angular.extend(vm, {
            init: init,
            projectsAddSubmit: projectsAddSubmit,
            _addItem: addItem,
            projectsAddBack: projectsAddBack,
			_errorHandler: errorHandler,
			language: $rootScope.language
        });

		$timeout(function () {
            window.scrollTo(0, 0);
        });
		
        init();

        function init() {
            $rootScope.loading = false;
        }

        function projectsAddSubmit() {
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
				ProjectsService.addItem(item)
					.then(function () {
                        addItem(item);
						$rootScope.myError = false;
						$state.go('projects');
					})
					.catch(errorHandler);
			} else {
                ProjectsLocalStorage.addItem(item);
                $rootScope.loading = true;
                $timeout(function () {
                    $state.go('projects');
                }, 100);
            }
         }

        function addItem(item) {
            ProjectsService.projects.push(item);
        }

        function projectsAddBack() {
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