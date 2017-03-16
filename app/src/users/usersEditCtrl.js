(function () {
    'use strict';
    
    angular
        .module('app')
        .controller('UsersEditCtrl', UsersEditCtrl);

    UsersEditCtrl.$inject = ['$state', '$rootScope', '$timeout', 'UsersService', 'UsersLocalStorage', '$stateParams'];

    function UsersEditCtrl($state, $rootScope, $timeout, UsersService, UsersLocalStorage, $stateParams) {
        var vm = this;

        angular.extend(vm, {
            init: init,
            usersSubmit: usersSubmit,
            _editItem: editItem,
            usersDialog: usersDialog,
            usersEditBack: usersEditBack,
			_errorHandler: errorHandler,
			language: $rootScope.language
        });

        angular.extend(vm, $stateParams.item);

        $timeout(function () {
            window.scrollTo(0, 0);
        });

        init();

        function init() {
            if ($stateParams.item.name == undefined) {
                $state.go('users');
            }

            $rootScope.myError = false;
            $rootScope.loading = false;
        }

        function usersSubmit() {
            if (vm.form.$invalid) {
                return;
            }

            $rootScope.myError = false;
            $rootScope.loading = true;

            var item = {
                id: vm.id,
                name: vm.name,
                pass: vm.pass,
                description: vm.description
            };
			
            if ($rootScope.mode == 'ON-LINE (Heroku)') {
				UsersService.editItem(item)
					.then(function () {
                        editItem(item);
						$rootScope.myError = false;
						$state.go('users');
					})
					.catch(errorHandler);
			} else {
				UsersLocalStorage.editItem(item);
                $rootScope.loading = true;
                $timeout(function () {
                    $state.go('users');
                }, 100);
			}
        }

        function editItem(item) {
            var users = UsersService.users;
            for (var i = 0; i < users.length; i++) {
                if (users[i].id == item.id) {
                    users.splice(i, 1, item);
                    break;
                }
            }
        }

        function usersDialog() {
            var obj = {
                id: vm.id,
                name: vm.name
            };
            $rootScope.loading = true;
            $timeout(function () {
                $state.go('users-dialog', {item: obj});
            }, 100);
        }

        function usersEditBack() {
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