(function () {
    'use strict';

    angular
        .module('app')
        .factory('InputsTransactionLocalStorage', InputsTransactionLocalStorage);

    InputsTransactionLocalStorage.$inject = ['ProjectsLocalStorage', 'GoodsLocalStorage'];

    function InputsTransactionLocalStorage(ProjectsLocalStorage, GoodsLocalStorage) {
        return {
            setClientSum: setClientSum,
            setStoreSum: setStoreSum
        };

        function setClientSum(id, sum) {
            var clients = ProjectsLocalStorage.getProjects();
            for (var i = 0; i < clients.length; i++) {
                if (clients[i].id == id) {
                    clients[i].sum = parseFloat(clients[i].sum) + parseFloat(sum);
                    ProjectsLocalStorage.getProjects(clients);
                }
            }
        }

        function setStoreSum(id, quantity) {
            var goods = GoodsLocalStorage.getGoods();
            console.log(id + '  -  ' + quantity);
            for (var i = 0; i < goods.length; i++) {
                if (goods[i].id == id) {
                    goods[i].quantity = parseFloat(goods[i].quantity) + parseFloat(quantity);
                    goods[i].store = true;
                    GoodsLocalStorage.setGoods(goods);
                }
            }
        }
    }
})();
