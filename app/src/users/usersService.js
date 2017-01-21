(function () {
    'use strict';

    angular
        .module('app')
        .factory('UsersService', UsersService);
		
	UsersService.$inject = ['$rootScope', '$http', '$q'];
	
    function UsersService($rootScope, $http, $q) {
		var webUrl = $rootScope.myConfig.webUrl;
		
        return {
            users: [],
			getUsers: getUsers,
            addItem: addItem,
            editItem: editItem,
            deleteItem: deleteItem,
			findByName: findByName
        };
		
        function getUsers() {
            var url = webUrl + 'api/users/get';
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
            var url = webUrl + 'api/users/add';
			item.authorization = $rootScope.access_token;
            return $http.post(url, item)
                .then(function (result) {
                    return result;
                });
        }
		
        function editItem(item) {
            var url = webUrl + 'api/users/update';
			item.authorization = $rootScope.access_token;
            return $http.post(url, item)
                .then(function (result) {
                    return result;
                });
        }

        function deleteItem(id) {
            var url = webUrl + 'api/users/delete';
            var item = {
                "id": id
            };
			item.authorization = $rootScope.access_token;
            return $http.post(url, item)
                .then(function (result) {
                    return result;
                });
        }
		
		function findByName(name) {
            var url = webUrl + 'api/users/findByName/' + name;
			return $http.get(url,
				{
					headers: {'Authorization': $rootScope.access_token}
				})
                .then(function (result) {
                    result.data;
                    return result;
                });
        }
    }
})();