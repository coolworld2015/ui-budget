(function () {
    'use strict';

    angular
        .module('app')
        .factory('UsersLocalStorage', UsersLocalStorage);

    function UsersLocalStorage() {
        return {
            users: [],
            numPerPage: 10,

            getUsers: getUsers,
            addItem: addItem,
            editItem: editItem,
            deleteItem: deleteItem,
            setUsers: setUsers,
			
            uploadUsers: uploadUsers,
            _sort: sort
        };

        function getUsers() {
            if (UsersLocalStorage.users === undefined) {
                var users = localStorage.getItem('ui-budget.users');
                users = JSON.parse(users);
                UsersLocalStorage.users = users;
            }

            if (UsersLocalStorage.users === null) {
                UsersLocalStorage.users = [
                    {id: '1', name: '1', pass: '1', description: 'description'}
                ];
                localStorage.setItem('ui-budget.users', JSON.stringify(users));
            }

            return UsersLocalStorage.users.sort(sort);
        }

        function addItem(item) {
            UsersLocalStorage.users.push(item);
            setUsers();
        }

        function editItem(item) {
            var users = UsersLocalStorage.users;
            if (users) {
                for (var i = 0; i < users.length; i++) {
                    if (users[i].id == item.id) {
                        users.splice(i, 1, item);
                        setUsers();
                        break;
                    }
                }
            }
        }

        function deleteItem(id) {
            var users = UsersLocalStorage.users;
            for (var i = 0; i < users.length; i++) {
                if (users[i].id == id) {
                    users.splice(i, 1);
                    setUsers();
                    break;
                }
            }
        }

        function setUsers() {
            localStorage.setItem('ui-budget.users', JSON.stringify(UsersLocalStorage.users));
        }

        function uploadUsers(users) {
            localStorage.setItem('ui-budget.users', JSON.stringify(users));
            UsersLocalStorage.users = undefined;
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