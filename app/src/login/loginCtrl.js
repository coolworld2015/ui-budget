(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$rootScope', '$state', '$http', 'UsersService', 'UsersLocalStorage'];

    function LoginCtrl($rootScope, $state, $http, UsersService, UsersLocalStorage) {
        var vm = this;

        angular.extend(vm, {
            init: init,
            toLogin: toLogin,
			onLogin: onLogin,
            checkUser: checkUser,
            _check: check,
            _errorHandler: errorHandler
        });

        init();

        function init() {
            $rootScope.currentUser = undefined;
            $rootScope.loading = false;
            $rootScope.error = false;
            $rootScope.message = false;
			
			vm.name = '1';
			vm.pass = '1';
        }

        function toLogin() {
            if (vm.form.$invalid) {
                return;
            }
            //checkUser(vm.name, vm.pass);
			onLogin();
        }
		
		function onLogin() {
			$rootScope.loading = true;
			$rootScope.error = false;
			var webUrl = $rootScope.myConfig.webUrl;
			
			var item = {
				"name": vm.name,
				"pass": vm.pass,
				"description": navigator.userAgent
			};
			
			$http.post(webUrl + 'api/login', item)
					.then(function (results) {
						$rootScope.loading = false;
						$rootScope.access_token = results.data.token;
						console.log(results);
						$rootScope.currentUser = vm.name;
						$state.go('main');
					})
					.catch(errorHandler);
		}
		
        function checkUser(name, pass) {
            $rootScope.myError = false;
            $rootScope.loading = true;

            if ($rootScope.mode == 'ON-LINE (Heroku)') {
                getUsersOn(name, pass);
            } else {
                vm.users = UsersLocalStorage.getUsers();
                check(vm.users, name, pass);
                $rootScope.myError = false;
                $rootScope.loading = false;
            }
        }

        function getUsersOn(name, pass) {
            vm.error = false;
            UsersService.findByName(name)
                .then(function (data) {
                    $rootScope.loading = false;
                    var user = data.data;

                    if (user && (user.name == name && user.pass == pass)) {
                        $rootScope.currentUser = {
                            name: name,
                            pass: pass
                        };

                        var id = (Math.random() * 1000000).toFixed();
                        var description  = navigator.userAgent;
                        var item = {
                            id: id,
                            name: vm.name,
                            description: description
                        };

                        AuditService.addItem(item)
                            .then(function () {
                                $state.go('main');
                            })
                            .catch(errorHandler);

                    } else {
                        vm.error = true;
                    }
                })
                .catch(errorHandler);
        }

        function check(users, name, pass) {
            if (users) {
                for (var i = 0; i < users.length; i++) {
                    if (users[i].name == name && users[i].pass == pass) {
                        $rootScope.currentUser = {
                            name: name,
                            pass: pass
                        };
                        $state.go('main');
                    } else {
                        vm.error = true;
                    }
                }
            }
        }

        function errorHandler() {
            $rootScope.loading = false;
            $rootScope.myError = true;
        }
    }
})();
