(function () {
    'use strict';

    angular
        .module('app')
        .controller('ConfigCtrl', ConfigCtrl);

    ConfigCtrl.$inject = ['$rootScope', '$state', '$http', '$timeout', 'ItemsLocalStorage'];

    function ConfigCtrl($rootScope, $state, $http, $timeout, ItemsLocalStorage) {
        var vm = this;

        angular.extend(vm, {
            init: init,
            toggleMode: toggleMode,
            doAction: doAction,
            _getItemsHeroku: getItemsHeroku,
            _loading: loading,
            _error: error,
            _complete: complete,
            toMain: toMain
        });
		
        $timeout(function () {
            window.scrollTo(0, 0);
        });
		
        init();

        function init() {
            vm.webUrl = $rootScope.myConfig.webUrl;
            vm.mode = $rootScope.mode;
            $rootScope.myError = false;
            $rootScope.loading = false;

            vm.options = [
                {name: 'Select transaction', value: 'none'},
                {name: 'Get items (Heroku)', value: 'heroku.items.get'}
            ];
            vm.selectedItem = vm.options[0];
        }

        function toggleMode() {
            if (vm.mode == 'OFF-LINE (LocalStorage)') {
                vm.mode = 'ON-LINE (Heroku)';
                $rootScope.mode = 'ON-LINE (Heroku)';
            } else {
                vm.mode = 'OFF-LINE (LocalStorage)';
                $rootScope.mode = 'OFF-LINE (LocalStorage)';
            }
            localStorage.setItem('ui-gai.mode', JSON.stringify(vm.mode));
            toMain();
        }

        function doAction() {
            loading();

            switch (vm.selectedItem.value) {
                case 'none':
                {
                    error();
                    break;
                }

                case 'heroku.items.get':
                {
                    getItemsHeroku();
                    break;
                }
            }
        }

        function getItemsHeroku() {
            $rootScope.loading = true;
            var url = vm.webUrl + 'api/items/get';
            $http.get(url)
                .then(function (results) {
                    try {
                        ItemsLocalStorage.uploadItems(results.data);
                        complete();
                    } catch (e) {
                        error();
                        alert(e);
                    }
                })
                .catch(function () {
                    error();
                });
        }

        function loading() {
            $rootScope.loading = true;
            $rootScope.myError = false;
            vm.complete = false;
            vm.error = false;
            vm.loading = true;
        }

        function error() {
            vm.complete = false;
            vm.loading = false;
            $rootScope.loading = false;
            $rootScope.myError = true;
        }

        function complete() {
            $rootScope.loading = false;
            vm.error = false;
            vm.loading = false;
            vm.complete = true;
        }

        function toMain() {
            $rootScope.loading = true;
            $timeout(function () {
                $state.go('main');
            }, 100);
        }
    }
})();

