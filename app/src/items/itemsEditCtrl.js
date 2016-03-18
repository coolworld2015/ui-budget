(function () {
    'use strict';

    angular
        .module('app')
        .controller('ItemsEditCtrl', ItemsEditCtrl);

    ItemsEditCtrl.$inject = ['$state', '$rootScope', '$timeout', 'ItemsService', 'ItemsLocalStorage', '$stateParams'];

    function ItemsEditCtrl($state, $rootScope, $timeout, ItemsService, ItemsLocalStorage, $stateParams) {
        var vm = this;

        angular.extend(vm, {
            init: init,
            itemsSubmit: itemsSubmit,
            _editItem: editItem,
            itemsDialog: itemsDialog,
            itemsEditBack: itemsEditBack,
            _errorHandler: errorHandler
        });

        angular.extend(vm, $stateParams.item);

        $timeout(function () {
            window.scrollTo(0, 0);
        });

        init();

        function init() {
            if ($stateParams.item.name == undefined) {
                $state.go('items');
            }
            $rootScope.myError = false;

            vm.description = 'Model: ' + vm.model + '\n'
                + 'Year: ' + vm.year + '\n'
                + 'Name: ' + vm.name + ' ' + vm.name1 + ' ' + vm.name2 + '\n'
                + 'Birth: ' + vm.bdate + '\n'
                + 'Job: ' + vm.job + '\n'
                + 'Position: ' + vm.pos + '\n'
                + 'Phone: ' + vm.phone + '\n'
                + 'Address: ' + vm.str + '\n'
                + 'House: ' + vm.house + '\n'
                + 'Apt: ' + vm.apt;

            $rootScope.loading = false;
        }

        function itemsSubmit() {
            if (vm.form.$invalid) {
                return;
            }

            $rootScope.loading = true;
            $rootScope.myError = false;

            var item = {
                id: vm.id,
                name: vm.name,
                description: vm.description
            };
            if ($rootScope.mode == 'ON-LINE (Heroku)') {
                ItemsService.editItem(item)
                    .then(function () {
                        editItem(item);
                        $rootScope.myError = false;
                        $state.go('items');
                    })
                    .catch(errorHandler);
            } else {
                try {
                    ItemsLocalStorage.editItem(item);
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

        function editItem(item) {
            var items = ItemsService.items;
            for (var i = 0; i < items.length; i++) {
                if (items[i].id == item.id) {
                    items.splice(i, 1, item);
                    break;
                }
            }
        }

        function itemsDialog() {
            var obj = {
                id: vm.id,
                name: vm.name
            };
            $rootScope.loading = true;
            $timeout(function () {
                $state.go('items-dialog', {item: obj});
            }, 100);
        }

        function itemsEditBack() {
            $rootScope.myError = false;
            $rootScope.loading = true;
            $timeout(function () {
                if ($stateParams.finds) {
                    $state.go('search');
                } else {
                    $state.go('items');
                }
            }, 100);
        }

        function errorHandler() {
            $rootScope.loading = false;
            $rootScope.myError = true;
        }
    }
})();