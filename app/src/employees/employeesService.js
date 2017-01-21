(function () {
	'use strict';
	
    angular
        .module('app')
        .factory('EmployeesService', EmployeesService);
		
    EmployeesService.$inject = ['$rootScope', '$http'];
	
    function EmployeesService($rootScope, $http) {
        var webUrl = $rootScope.myConfig.webUrl;
		
        return {
            employees: [],
			getEmployees: getEmployees,
            addItem: addItem,
            editItem: editItem,
            deleteItem: deleteItem,
			findClient: findClient,
			_sort: sort
        };
		
        function getEmployees() {
            var url = webUrl + 'api/employees/get';
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
            var url = webUrl + 'api/employees/add';
			item.authorization = $rootScope.access_token;
            return $http.post(url, item)
                .then(function (result) {
                    return result;
                });
        }
		
        function editItem(item) {
            var url = webUrl + 'api/employees/update';
			item.authorization = $rootScope.access_token;
            return $http.post(url, item)
                .then(function (result) {
                    return result;
                });
        }

        function deleteItem(id) {
            var url = webUrl + 'api/employees/delete';
            var item = {
                "id": id
            };
			item.authorization = $rootScope.access_token;
            return $http.post(url, item)
                .then(function (result) {
                    return result;
                });
        }

		function findClient(id) {
            var url = webUrl + 'api/employees/find';
            var item = {
                "id": id
            };
			item.authorization = $rootScope.access_token;
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
