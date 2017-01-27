(function () {
	'use strict';
	
    angular
        .module('app')
        .factory('ProjectsService', ProjectsService);
		
    ProjectsService.$inject = ['$rootScope', '$http'];
	
    function ProjectsService($rootScope, $http) {
        var webUrl = $rootScope.myConfig.webUrl;
		
        return {
            projects: [],
			getProjects: getProjects,
            addItem: addItem,
            editItem: editItem,
            deleteItem: deleteItem,
			findClient: findClient,
			_sort: sort
        };
		
        function getProjects() {
            var url = webUrl + 'api/projects/get';
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
            var url = webUrl + 'api/projects/add';
			item.authorization = $rootScope.access_token;
            return $http.post(url, item)
                .then(function (result) {
                    return result;
                });
        }
		
        function editItem(item) {
            var url = webUrl + 'api/projects/update';
			item.authorization = $rootScope.access_token;
            return $http.post(url, item)
                .then(function (result) {
                    return result;
                });
        }

        function deleteItem(id) {
            var url = webUrl + 'api/projects/delete';
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
            var url = webUrl + 'api/projects/find';
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
