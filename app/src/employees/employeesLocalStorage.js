(function () {
    'use strict';

    angular
        .module('app')
        .factory('EmployeesLocalStorage', EmployeesLocalStorage);

    function EmployeesLocalStorage() {
        return {
            employees: [],
            numPerPage: 10,

            getEmployees: getEmployees,
            addItem: addItem,
            editItem: editItem,
            deleteItem: deleteItem,
            setEmployees: setEmployees,

            uploadEmployees: uploadEmployees,
            _sort: sort
        };

        function getEmployees() {
            if (EmployeesLocalStorage.employees === undefined) {
                var employees = localStorage.getItem('ui-budget.employees');
                employees = JSON.parse(employees);
                EmployeesLocalStorage.employees = employees;
            }

            if (EmployeesLocalStorage.employees === null) {
                EmployeesLocalStorage.employees = [];
            }

            return EmployeesLocalStorage.employees.sort(sort);
        }

        function addItem(item) {
            EmployeesLocalStorage.employees.push(item);
            setEmployees();
        }

        function editItem(item) {
            var employees = EmployeesLocalStorage.employees;
            for (var i = 0; i < employees.length; i++) {
                if (employees[i].id == item.id) {
                    employees.splice(i, 1, item);
                    setEmployees();
                    break;
                }
            }
        }

        function deleteItem(id) {
            var employees = EmployeesLocalStorage.employees;
            for (var i = 0; i < employees.length; i++) {
                if (employees[i].id == id) {
                    employees.splice(i, 1);
                    setEmployees();
                    break;
                }
            }
        }

        function setEmployees() {
            localStorage.setItem('ui-budget.employees', JSON.stringify(EmployeesLocalStorage.employees));
        }

        function uploadEmployees(employees) {
            localStorage.setItem('ui-budget.employees', JSON.stringify(employees));
            EmployeesLocalStorage.employees = undefined;
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
