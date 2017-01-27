(function () {
    'use strict';

    angular
        .module('app')
        .factory('InputsService', InputsService);

    InputsService.$inject = ['$rootScope', '$http'];

    function InputsService($rootScope, $http) {
        var webUrl = $rootScope.myConfig.webUrl;

        return {
			inputs: [],
			getInputs: getInputs,
            addItem: addItem,
            editItem: editItem,
            deleteItem: deleteItem
        };
		
        function getInputs() {
            var url = webUrl + 'api/inputs/get';
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
            var url = webUrl + 'api/inputs/add';
			item.authorization = $rootScope.access_token;
            return $http.post(url, item)
                .then(function (result) {
                    return result;
                });
        }

        function editItem(item) {
            var url = webUrl + 'api/inputs/update';
			item.authorization = $rootScope.access_token;
            return $http.post(url, item)
                .then(function (result) {
                    return result;
                });
        }

        function deleteItem(item) {
            var url = webUrl + 'api/inputs/delete';
			item.authorization = $rootScope.access_token;
            return $http.post(url, item)
                .then(function (result) {
                    return result;
                });
        }
    }
})();

