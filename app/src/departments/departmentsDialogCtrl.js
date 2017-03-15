(function () {
    'use strict';

    angular
        .module('app')
        .controller('DepartmentsDialogCtrl', DepartmentsDialogCtrl);

    DepartmentsDialogCtrl.$inject = ['$state', '$rootScope', '$timeout', 'DepartmentsService', 'DepartmentsLocalStorage', '$stateParams'];

    function DepartmentsDialogCtrl($state, $rootScope, $timeout, DepartmentsService, DepartmentsLocalStorage, $stateParams) {
        var vm = this;

        angular.extend(vm, {
            init: init,
            departmentsDelete: departmentsDelete,
            _deleteItem: deleteItem,
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
            if ($stateParams.item.id == undefined) {
                $state.go('departments');
            }
            $rootScope.loading = false;
        }

        function departmentsDelete() {
			$rootScope.loading = true;
            $rootScope.myError = false;
			
			if ($rootScope.mode == 'ON-LINE (Heroku)') {
				DepartmentsService.deleteItem(vm.id)
					.then(function () {
                        deleteItem(vm.id);
                        $rootScope.myError = false;
						$state.go('departments');
					})
					.catch(errorHandler);
			} else {
                DepartmentsLocalStorage.deleteItem(vm.id);
                $rootScope.loading = true;
                $timeout(function () {
                    $state.go('departments');
                }, 100);
            }
        }

        function deleteItem(id) {
            var departments = DepartmentsService.departments;
            for (var i = 0; i < departments.length; i++) {
                if (departments[i].id == id) {
                    departments.splice(i, 1);
                    break;
                }
            }
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