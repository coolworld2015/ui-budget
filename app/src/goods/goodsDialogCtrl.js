(function () {
    'use strict';

    angular
        .module('app')
        .controller('GoodsDialogCtrl', GoodsDialogCtrl);

    GoodsDialogCtrl.$inject = ['$state', '$rootScope', '$timeout', 'GoodsService', 'GoodsLocalStorage', '$stateParams'];

    function GoodsDialogCtrl($state, $rootScope, $timeout, GoodsService, GoodsLocalStorage, $stateParams) {
        var vm = this;

        angular.extend(vm, {
            init: init,
            goodsDelete: goodsDelete,
            _deleteItem: deleteItem,
            goodsEditBack: goodsEditBack,
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
                $state.go('goods');
            }
            $rootScope.loading = false;
        }

        function goodsDelete() {
            $rootScope.loading = true;
            $rootScope.myError = false;
			
			if ($rootScope.mode == 'ON-LINE (Heroku)') {
				GoodsService.deleteItem(vm.id)
					.then(function () {
                        deleteItem(vm.id);
						$rootScope.myError = false;
						$state.go('goods');
					})
					.catch(errorHandler);
			} else {
                GoodsLocalStorage.deleteItem(vm.id);
                $rootScope.loading = true;
                $timeout(function () {
                    $state.go('goods');
                }, 100);
            }
        }

        function deleteItem(id) {
            var goods = GoodsService.goods;
            for (var i = 0; i < goods.length; i++) {
                if (goods[i].id == id) {
                    goods.splice(i, 1);
                    break;
                }
            }
        }

        function goodsEditBack() {
            $rootScope.loading = true;
            $timeout(function () {
                $state.go('goods');
            }, 100);
        }		
		
		function errorHandler() {
            $rootScope.loading = false;
            $rootScope.myError = true;
        }
    }
})();