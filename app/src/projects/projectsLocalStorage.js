(function () {
    'use strict';

    angular
        .module('app')
        .factory('ProjectsLocalStorage', ProjectsLocalStorage);

    ProjectsLocalStorage.$inject = ['$rootScope'];

    function ProjectsLocalStorage($rootScope) {
        var webUrl = $rootScope.myConfig.webUrl;

        return {
            clients: [],
            numPerPage: 10,

            getProjects: getProjects,
            addItem: addItem,
            editItem: editItem,
            deleteItem: deleteItem,
            setClients: setClients,

            uploadClients: uploadClients,
            _sort: sort
        };

        function getProjects() {
            if (ProjectsLocalStorage.clients === undefined) {
                var clients = localStorage.getItem('ui-budget.clients');
                clients = JSON.parse(clients);
                ProjectsLocalStorage.clients = clients;
            }

            if (ProjectsLocalStorage.clients === null) {
                ProjectsLocalStorage.clients = [];
            }

            return ProjectsLocalStorage.clients.sort(sort);
        }

        function addItem(item) {
            ProjectsLocalStorage.clients.push(item);
            setClients();
        }

        function editItem(item) {
            var clients = ClientsLocalStorage.clients;
            for (var i = 0; i < clients.length; i++) {
                if (clients[i].id == item.id) {
                    clients.splice(i, 1, item);
                    setClients();
                    break;
                }
            }
        }

        function deleteItem(id) {
            var clients = ClientsLocalStorage.clients;
            for (var i = 0; i < clients.length; i++) {
                if (clients[i].id == id) {
                    clients.splice(i, 1);
                    setClients();
                    break;
                }
            }
        }

        function setClients() {
            localStorage.setItem('ui-budget.clients', JSON.stringify(ClientsLocalStorage.clients));
        }

        function uploadClients(clients) {
            localStorage.setItem('ui-budget.clients', JSON.stringify(clients));
            ClientsLocalStorage.clients = undefined;
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
