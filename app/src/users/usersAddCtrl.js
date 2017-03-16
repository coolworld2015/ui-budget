(function () {
    'use strict';

    angular
        .module('app')
        .controller('UsersAddCtrl', UsersAddCtrl);

    UsersAddCtrl.$inject = ['$state', '$rootScope', '$timeout', 'UsersService', 'UsersLocalStorage'];

    function UsersAddCtrl($state, $rootScope, $timeout, UsersService, UsersLocalStorage) {
        var vm = this;

        angular.extend(vm, {
            init: init,
            usersAddSubmit: usersAddSubmit,
            usersAddBack: usersAddBack,
			_errorHandler: errorHandler,
			language: $rootScope.language
        });

        init();

        function init() {
            $rootScope.loading = false;
        }

        function usersAddSubmit() {
            if (vm.form.$invalid) {
                return;
            }

            $rootScope.myError = false;
            $rootScope.loading = true;

            var id = (Math.random() * 1000000).toFixed();
            var item = {
                id: id,
                name: vm.name,
                pass: vm.pass,
                description: vm.description
            };
			
            if ($rootScope.mode == 'ON-LINE (Heroku)') {
				UsersService.addItem(item)
					.then(function () {
                        addItem(item);
						$rootScope.myError = false;
						$state.go('users');
					})
					.catch(errorHandler);
			} else {
				UsersLocalStorage.addItem(item);
                $rootScope.loading = true;
                $timeout(function () {
                    $state.go('users');
                }, 100);
			}
        }

        function addItem(item) {
            UsersService.users.push(item);
        }

        function usersAddBack() {
            $rootScope.loading = true;
            $timeout(function () {
                $state.go('users');
            }, 100);
        }
		
        function errorHandler() {
            $rootScope.loading = false;
            $rootScope.myError = true;
        }
    }
})();
