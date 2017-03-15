(function () {
    'use strict';

    angular
        .module('app')
        .controller('DepartmentsAddCtrl', DepartmentsAddCtrl);

    DepartmentsAddCtrl.$inject = ['$state', '$rootScope', '$timeout', 'DepartmentsService', 'DepartmentsLocalStorage'];

    function DepartmentsAddCtrl($state, $rootScope, $timeout, DepartmentsService, DepartmentsLocalStorage) {
        var vm = this;

        angular.extend(vm, {
            init: init,
            departmentsAddSubmit: departmentsAddSubmit,
            _addItem: addItem,
            departmentsAddBack: departmentsAddBack,
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

        function departmentsAddSubmit() {
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
				DepartmentsService.addItem(item)
					.then(function () {
                        addItem(item);
						$rootScope.myError = false;
						$state.go('departments');
					})
					.catch(errorHandler);
			} else {
                DepartmentsLocalStorage.addItem(item);
                $rootScope.loading = true;
                $timeout(function () {
                    $state.go('departments');
                }, 100);
            }
         }

        function addItem(item) {
            DepartmentsService.departments.push(item);
        }

        function departmentsAddBack() {
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