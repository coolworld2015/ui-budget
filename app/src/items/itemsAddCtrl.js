(function () {
    'use strict';

    angular
        .module('app')
        .controller('ItemsAddCtrl', ItemsAddCtrl);

    ItemsAddCtrl.$inject = ['$state', '$rootScope', '$timeout', 'ItemsService', 'ItemsLocalStorage'];

    function ItemsAddCtrl($state, $rootScope, $timeout, ItemsService, ItemsLocalStorage) {

        var vm = this;
        var optionalCategory = {name: 'Select category'};
        var optionalGroup = {name: 'Select group'};

        angular.extend(vm, {
            init: init,
            itemsAddSubmit: itemsAddSubmit,
            _addItem: addItem,
            itemsAddBack: itemsAddBack,
            _errorHandler: errorHandler
        });

        $timeout(function () {
            window.scrollTo(0, 0);
        });

        init();

        function init() {
            $rootScope.loading = false;
        }

        function itemsAddSubmit() {
            if (vm.form.$invalid) {
                return;
            }

            $rootScope.myError = false;
            $rootScope.loading = true;

            var id = (Math.random() * 1000000).toFixed();
            var item = {
                id: id,
                name: vm.name,
                description: vm.description
            };

            if ($rootScope.mode == 'ON-LINE (Heroku)') {
                ItemsService.addItem(item)
                    .then(function () {
                        addItem(item);
                        $rootScope.myError = false;
                        $state.go('items');
                    })
                    .catch(errorHandler);
            } else {
                try {
                    ItemsLocalStorage.addItem(item);
                    $rootScope.loading = true;
                    $timeout(function () {
                        $state.go('items');
                    }, 100);
                } catch (e) {
                    errorHandler();
                    alert(e);
                }
            }
        }

        function addItem(item) {
            ItemsService.items.push(item);
        }

        function itemsAddBack() {
            $rootScope.myError = false;
            $rootScope.loading = true;
            $timeout(function () {
                $state.go('items');
            }, 100);
        }

        function errorHandler() {
            $rootScope.loading = false;
            $rootScope.myError = true;
        }
    }
})();