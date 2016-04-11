(function () {
	'use strict';
	
    angular
        .module('app')
        .factory('DepartmentsService', DepartmentsService);
		
    DepartmentsService.$inject = ['$rootScope', '$http'];
	
    function DepartmentsService($rootScope, $http) {
        var webUrl = $rootScope.myConfig.webUrl;
		
        return {
            departments: [],
			getDepartments: getDepartments,
            addItem: addItem,
            editItem: editItem,
            deleteItem: deleteItem,
			findClient: findClient,
			_sort: sort
        };
		
        function getDepartments() {
            var url = webUrl + 'api/departments/get';
            return $http.get(url)
                .then(function (result) {
                    result.data.sort(sort);
                    return result;
                });
        }
		
        function addItem(item) {
            var url = webUrl + 'api/departments/add';
            return $http.post(url, item)
                .then(function (result) {
                    return result;
                });
        }
		
        function editItem(item) {
            var url = webUrl + 'api/departments/update';
            return $http.post(url, item)
                .then(function (result) {
                    return result;
                });
        }

        function deleteItem(id) {
            var url = webUrl + 'api/departments/delete';
            var item = {
                "id": id
            };
            return $http.post(url, item)
                .then(function (result) {
                    return result;
                });
        }

		function findClient(id) {
            var url = webUrl + 'api/departments/find';
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
