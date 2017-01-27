(function () {
    'use strict';

    angular
        .module('app')
        .factory('ItemsService', ItemsService);

    ItemsService.$inject = ['$rootScope', '$http'];

    function ItemsService($rootScope, $http) {
        var webUrl = $rootScope.myConfig.webUrl;

        return {
			items: [],
			getAllItems: getAllItems,
            getItems: getItems,
            addItem: addItem,
            editItem: editItem,
            deleteItem: deleteItem,
            findItem: findItem,
            _sort: sort
        };

        function getAllItems() {
            var url = webUrl + 'api/items/getAll';
			return $http.get(url,
				{
					headers: {'Authorization': $rootScope.access_token}
				})
                .then(function (result) {
                    result.data.sort(sort);
                    return result;
                });
        }
		
        function getItems() {
            var url = webUrl + 'api/items/get';
			return $http.get(url,
				{
					headers: {'Authorization': $rootScope.access_token}
				})
                .then(function (result) {
                    result.data.sort(sort);
                    return result;
                });
        }
		
        function addItem(item) {
            var url = webUrl + 'api/items/add';
			item.authorization = $rootScope.access_token;
            return $http.post(url, item)
                .then(function (result) {
                    return result;
                });
        }

        function editItem(item) {
            var url = webUrl + 'api/items/update';
			item.authorization = $rootScope.access_token;
            return $http.post(url, item)
                .then(function (result) {
                    return result;
                });
        }

        function deleteItem(id) {
            var url = webUrl + 'api/items/delete';
            var item = {
                "id": id
            };
			item.authorization = $rootScope.access_token;
            return $http.post(url, item)
                .then(function (result) {
                    return result;
                });
        }

        function findItem(id) {
            var url = webUrl + 'api/items/find';
            var item = {
                "id": id
            };
            return $http.post(url, item)
                .then(function (result) {
                    return result;
                });
        }

        function sort(a, b) {
            var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
            if (nameA < nameB) {
                return -1
            }
            if (nameA > nameB) {
                return 1
            }
            return 0;
        }
    }
})();
