(function () {
    'use strict';

    angular
        .module('app')
        .controller('InputsAddCtrl', InputsAddCtrl);

    InputsAddCtrl.$inject = ['$state', '$rootScope', '$filter', '$timeout', 'InputsService', 'InputsLocalStorage',
        '$stateParams', 'employees', 'departments', 'projects', 'goods'];

    function InputsAddCtrl($state, $rootScope, $filter, $timeout, InputsService, InputsLocalStorage,
                           $stateParams, employees, departments, projects, goods) {
        var vm = this;

        var optionalProject = {name: 'Select project'};
        var optionalDepartment = {name: 'Select department'};
        var optionalEmployee = {name: 'Select employee'};
        var optionalProduct = {name: 'Select resource'};

        angular.extend(vm, $stateParams.item);

        angular.extend(vm, {
			updateChange: updateChange,
            selectedProject: optionalProject,
            selectedDepartment: optionalDepartment,
            selectedEmployee: optionalEmployee,
            selectedProduct: optionalProduct,
			
            init: init,
            updateChangeProject: updateChangeProject,
            updateChangeDepartment: updateChangeDepartment,
            updateChangeEmployee: updateChangeEmployee,
            updateChangeProduct: updateChangeProduct,
 
            inputsAddSubmit: inputsAddSubmit,
            _addItem: addItem,
            inputsAddBack: inputsAddBack,
            _errorHandler: errorHandler
        });

		$timeout(function () {
            window.scrollTo(0, 0);
        });
		
        init();

        function init() {
            if ($stateParams.item.count == undefined) {
                $state.go('inputs');
            }

            var now = new Date();
            vm.date = $filter('date')(now, 'dd/MM/yyyy H:mm:ss '); //TODO Russian style
            vm.date = $filter('date')(now, 'MM/dd/yyyy H:mm:ss ');
            vm.invoiceID = vm.count;

			vm.total = '0.00';

            vm.projects = projects;
            vm.projectsOptions = [].concat(vm.projects);
            vm.projectsOptions.unshift(optionalProject);

            vm.departments = departments;
            vm.departmentsOptions = [].concat(vm.departments);
            vm.departmentsOptions.unshift(optionalDepartment);

            vm.employees = employees;
            vm.employeesOptions = [].concat(vm.employees);
            vm.employeesOptions.unshift(optionalEmployee);

            vm.products = goods;
            vm.productsOptions = [].concat(vm.products);
            vm.productsOptions.unshift(optionalProduct);
			
            $rootScope.myError = false;
            $rootScope.loading = false;
        }
		
        function updateChange() {
			vm.total = parseFloat(vm.price).toFixed(2)*parseFloat(vm.quantity).toFixed(2);
			vm.total = (vm.total).toFixed(2);
        }
		
        function updateChangeProject(item) {
            vm.errorProject = false;
            vm.ProjectID = item.id;
        }

        function updateChangeDepartment(item) {
            vm.errorDepartment = false;
            vm.DepartmentID = item.id;
        }
		
        function updateChangeEmployee(item) {
            vm.errorEmployee = false;
            vm.EmployeeID = item.id;
        }        
		
		function updateChangeProduct(item) {
            vm.errorProduct = false;
            if (item.price) {
                vm.goodsID = item.id;
                vm.price = parseFloat(item.price).toFixed(2);
                vm.priceFixed = item.price;
				
				vm.total = parseFloat(vm.price).toFixed(2)*parseFloat(vm.quantity).toFixed(2);
				vm.total = (vm.total).toFixed(2);
            } else {
                vm.price = '0.00';
            }
        }
		
        function inputsAddSubmit() {
            if (vm.selectedProject.name == 'Select project') {
                vm.errorProject = true;
            }

            if (vm.selectedDepartment.name == 'Select department') {
                vm.errorDepartment = true;
            }

			if (vm.selectedEmployee.name == 'Select employee') {
                vm.errorEmployee = true;
            }
	
			if (vm.selectedProduct.name == 'Select resource') {
                vm.errorProduct = true;
            }
			
            if (vm.errorProject == true || vm.errorDepartment == true || vm.errorEmployee == true || vm.errorProduct == true) {
                return;
            }

            if (vm.form.$invalid) {
                return;
            }

            $rootScope.myError = false;
            $rootScope.loading = true;
			
			vm.price = parseFloat(vm.price).toFixed(2);
			vm.quantity = parseFloat(vm.quantity).toFixed(2);
			
            var id = (Math.random() * 1000000).toFixed();
            var item = {
                id: id,
                invoiceID: vm.invoiceID,
				
                project: vm.selectedProject.name,
                projectID: vm.ProjectID,
				
                department: vm.selectedDepartment.name,
                departmentID: vm.DepartmentID,
       
                employee: vm.selectedEmployee.name,
                employeeID: vm.EmployeeID,

                product: vm.selectedProduct.name,
                productID: vm.ProductID,
				quantity: vm.quantity,
				price: vm.price,
				
				date: vm.date,
                total: vm.total,
                description: vm.description
            };

            if ($rootScope.mode == 'ON-LINE (Heroku)') {
                InputsService.addItem(item)
                    .then(function () {
                        addItem(item);
                        $rootScope.myError = false;
                        $state.go('inputs');
                    })
                    .catch(errorHandler);
            } else {
                InputsLocalStorage.addItem(item);
                $rootScope.loading = true;
                $timeout(function () {
					$state.go('inputs');
                }, 100);
            }
        }

        function addItem(item) {
            InputsService.inputs.push(item);
        }

        function inputsAddBack() {
            $rootScope.loading = true;
            $timeout(function () {
                $state.go('inputs');
            }, 100);
        }

        function errorHandler() {
            $rootScope.loading = false;
            $rootScope.myError = true;
        }
    }
})();