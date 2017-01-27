(function () {
    'use strict';

    angular
        .module('app')
        .factory('OutputsService', OutputsService);

    OutputsService.$inject = ['$rootScope', '$http', '$q'];

    function OutputsService($rootScope, $http, $q) {
        var webUrl = $rootScope.myConfig.webUrl;

        return {
            outputs: [],
			getOutputs: getOutputs,
            addItem: addItem,
            editItem: editItem,
            deleteItem: deleteItem
        };
		
        function getOutputs() {
            var url = webUrl + 'api/outputs/get';
			return $http.get(url,
				{
					headers: {'Authorization': $rootScope.access_token}
				})
                .then(function (result) {
                    result.data.sort();
                    return result;
                });
        }
		
        function addItem(item) {
            var url = webUrl + 'api/outputs/add';
			item.authorization = $rootScope.access_token;
            return $http.post(url, item)
                .then(function (result) {
                    return result;
                })
                .catch(function (reject) {
                    return $q.reject(reject);
                });
        }

        function editItem(item) {
            var url = webUrl + 'api/outputs/update';
			item.authorization = $rootScope.access_token;
            return $http.post(url, item)
                .then(function (result) {
                    return result;
                })
                .catch(function (reject) {
                    return $q.reject(reject);
                });
        }

        function deleteItem(item) {
            var url = webUrl + 'api/outputs/delete';
			item.authorization = $rootScope.access_token;
            return $http.post(url, item)
                .then(function (result) {
                    return result;
                })
                .catch(function (reject) {
                    return $q.reject(reject);
                });
        }
    }
})();

