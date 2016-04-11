(function () {
    'use strict';

    angular
        .module('app')
        .factory('DepartmentsLocalStorage', DepartmentsLocalStorage);

    function DepartmentsLocalStorage() {
        return {
            departments: [],
            numPerPage: 10,

            getDepartments: getDepartments,
            addItem: addItem,
            editItem: editItem,
            deleteItem: deleteItem,
            setDepartments: setDepartments,

            uploadDepartments: uploadDepartments,
            _sort: sort
        };

        function getDepartments() {
            if (DepartmentsLocalStorage.departments === undefined) {
                var departments = localStorage.getItem('ui-budget.departments');
                departments = JSON.parse(departments);
                DepartmentsLocalStorage.departments = departments;
            }

            if (DepartmentsLocalStorage.departments === null) {
                DepartmentsLocalStorage.departments = [];
            }

            return DepartmentsLocalStorage.departments.sort(sort);
        }

        function addItem(item) {
            DepartmentsLocalStorage.departments.push(item);
            setDepartments();
        }

        function editItem(item) {
            var departments = DepartmentsLocalStorage.departments;
            for (var i = 0; i < departments.length; i++) {
                if (departments[i].id == item.id) {
                    departments.splice(i, 1, item);
                    setDepartments();
                    break;
                }
            }
        }

        function deleteItem(id) {
            var departments = DepartmentsLocalStorage.departments;
            for (var i = 0; i < departments.length; i++) {
                if (departments[i].id == id) {
                    departments.splice(i, 1);
                    setDepartments();
                    break;
                }
            }
        }

        function setDepartments() {
            localStorage.setItem('ui-budget.departments', JSON.stringify(DepartmentsLocalStorage.departments));
        }

        function uploadDepartments(departments) {
            localStorage.setItem('ui-budget.departments', JSON.stringify(departments));
            DepartmentsLocalStorage.departments = undefined;
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
