(function () {
    'use strict';

    angular
        .module('app')
        .factory('OutputsTransactionLocalStorage', OutputsTransactionLocalStorage);

    OutputsTransactionLocalStorage.$inject = ['DepartmentsLocalStorage', 'ProjectsLocalStorage', 'EmployeesLocalStorage', 'GoodsLocalStorage'];

    function OutputsTransactionLocalStorage(DepartmentsLocalStorage, ProjectsLocalStorage, EmployeesLocalStorage, GoodsLocalStorage) {
        return {
            setDepartmentSum: setDepartmentSum,
            setProjectSum: setProjectSum,
            setEmployeeSum: setEmployeeSum,
            setStoreSum: setStoreSum
        };

        function setDepartmentSum(id, sum) {
            var department = DepartmentsLocalStorage.getDepartments();
            for (var i = 0; i < department.length; i++) {
                if (department[i].id == id) {
                    department[i].sum = parseFloat(department[i].sum) + parseFloat(sum);
                    DepartmentsLocalStorage.setDepartments(department);
                }
            }
        }
		
        function setProjectSum(id, sum) {
            var project = ProjectsLocalStorage.getProjects();
            for (var i = 0; i < project.length; i++) {
                if (project[i].id == id) {
                    project[i].sum = parseFloat(project[i].sum) + parseFloat(sum);
                    ProjectsLocalStorage.setProjects(project);
                }
            }
        }        
		
		function setEmployeeSum(id, sum) {
            var employee = EmployeesLocalStorage.getEmployees();
            for (var i = 0; i < employee.length; i++) {
                if (employee[i].id == id) {
                    employee[i].sum = parseFloat(employee[i].sum) + parseFloat(sum);
                    EmployeesLocalStorage.setEmployees(employee);
                }
            }
        }
		
        function setStoreSum(id, quantity) {
            var goods = GoodsLocalStorage.getGoods();
            console.log(id + '  -  ' + quantity);
            for (var i = 0; i < goods.length; i++) {
                if (goods[i].id == id) {
                    goods[i].quantity = parseFloat(goods[i].quantity) + parseFloat(quantity);
                    goods[i].store = true;
                    GoodsLocalStorage.setGoods(goods);
                }
            }
        }
    }
})();
