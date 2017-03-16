(function () {
    'use strict';

    angular
        .module('app')
        .controller('InputsDialogCtrl', InputsDialogCtrl);

    InputsDialogCtrl.$inject = ['$state', '$q', '$rootScope', '$timeout', 'InputsService', 'InputsLocalStorage',
        'InputsInvoiceService', 'InputsInvoiceLocalStorage', '$stateParams',
        'InputsTransactionLocalStorage',
		'DepartmentsService', 'ProjectsService', 'EmployeesService', 'GoodsService'];
		
    function InputsDialogCtrl($state, $q, $rootScope, $timeout, InputsService, InputsLocalStorage,
                              InputsInvoiceService, InputsInvoiceLocalStorage, $stateParams,
                              InputsTransactionLocalStorage,
							  DepartmentsService, ProjectsService, EmployeesService, GoodsService) {
        var vm = this;

        angular.extend(vm, {
            init: init,
            _getInputInvoicesOn: getInputInvoicesOn,
            inputsDelete: inputsDelete,
            
			_deleteItem: deleteItem,
			_setDepartmentSum: setDepartmentSum,
			_setProjectSum: setProjectSum,
			_setEmployeeSum: setEmployeeSum,
			_setStoreSum: setStoreSum,
			
			
            _fillRequests: fillRequests,
            _modifyGoods: modifyGoods,
            _findGood: findGood,
            _editGood: editGood,
            _deleteInputsInvoiceItem: deleteInputsInvoiceItem,
            inputsEditBack: inputsEditBack,
            _errorHandler: errorHandler,
			language: $rootScope.language
        });

        angular.extend(vm, $stateParams.item);
		
        $timeout(function () {
            window.scrollTo(0, 0);
        });
		
        init();

        function init() {
            if ($stateParams.item.id == undefined) {
                $state.go('inputs');
            }

            vm.webUrl = $rootScope.myConfig.webUrl;

            if ($rootScope.mode == 'ON-LINE (Heroku)') {
                //getInputInvoicesOn();
                $rootScope.myError = false;
                $rootScope.loading = false;
            } else {
                vm.inputInvoices = [].concat(InputsInvoiceLocalStorage.getInputInvoice());
                $rootScope.myError = false;
                $rootScope.loading = false;
            }

            vm.requests = [];
            vm.index = [];
            vm.i = 0;
        }

        function getInputInvoicesOn() {
            InputsInvoiceService.getInvoices()
                .then(function (data) {
                    vm.inputInvoices = data.data;
                    $rootScope.myError = false;
                    $rootScope.loading = false;
                })
                .catch(errorHandler);
        }

        function inputsDelete() {
            $rootScope.loading = true;
            $rootScope.myError = false;

            var item = {
                id: vm.id,
                invoiceID: vm.invoiceID,
				
                project: vm.project,
                projectID: vm.projectID,
				
                department: vm.department,
                departmentID: vm.departmentID,
       
                employee: vm.employee,
                employeeID: vm.employeeID,

                product: vm.product,
                productID: vm.productID,
				quantity: vm.quantity,
				price: vm.price,
				
				date: vm.date,
                total: vm.total,
                description: vm.description
            };
			
            if ($rootScope.mode == 'ON-LINE (Heroku)') {
                InputsService.deleteItem(item)
                    .then(function () {
                        deleteItem(vm.id);
						
						setDepartmentSum(vm.departmentID, vm.total);
						setProjectSum(vm.projectID, vm.total);
						setEmployeeSum(vm.employeeID, vm.total);
						setStoreSum(vm.productID, vm.quantity);
						
                        $rootScope.myError = false;
                        $state.go('inputs');
                    })
                    .catch(errorHandler);
            } else {
                var sum = parseFloat($stateParams.item.total);
                var quantity = parseFloat($stateParams.item.quantity);
 
				InputsTransactionLocalStorage.setDepartmentSum(vm.departmentID, -sum);
				InputsTransactionLocalStorage.setProjectSum(vm.projectID, -sum);
				InputsTransactionLocalStorage.setEmployeeSum(vm.employeeID, -sum);
				InputsTransactionLocalStorage.setStoreSum(vm.productID, -quantity);
				
                InputsLocalStorage.deleteItem(vm.id);

                $timeout(function () {
                    $state.go('inputs');
                }, 100);
            }
        }

        function deleteItem(id) {
            var inputs = InputsService.inputs;
            for (var i = 0; i < inputs.length; i++) {
                if (inputs[i].id == id) {
                    inputs.splice(i, 1);
                    break;
                }
            }
        }
		
        function setDepartmentSum(id, sum) {
            var departments = DepartmentsService.departments;
				for (var i = 0; i < departments.length; i++) {
					if (departments[i].id == id) {
						departments[i].sum = parseFloat(departments[i].sum) - parseFloat(sum);
						DepartmentsService.departments = departments;
					}
				}
        }
        function setProjectSum(id, sum) {
            var projects = ProjectsService.projects;
            for (var i = 0; i < projects.length; i++) {
                if (projects[i].id == id) {
                    projects[i].sum = parseFloat(projects[i].sum) - parseFloat(sum);
                    ProjectsService.projects = projects;
                }
            }
        }        
		
		function setEmployeeSum(id, sum) {
            var employees = EmployeesService.employees;
            for (var i = 0; i < employees.length; i++) {
                if (employees[i].id == id) {
                    employees[i].sum = parseFloat(employees[i].sum) - parseFloat(sum);
                    EmployeesService.employees = employees;
                }
            }
        }
		
        function setStoreSum(id, quantity) {
            var goods = GoodsService.goods;
            for (var i = 0; i < goods.length; i++) {
                if (goods[i].id == id) {
                    goods[i].quantity = parseFloat(goods[i].quantity) - parseFloat(quantity);
                    goods[i].store = true;
                    GoodsService.goods = goods;
                }
            }
        }
		
        function fillRequests() {
            vm.inputInvoices.forEach(function (el) {
                if (el.invoiceID == $stateParams.item.id) {
                    vm.index.push(el);
                    vm.requests.push(modifyGoods);
                }
            })
        }

        function modifyGoods() {
            return findGood()
                .then(editGood)
                .then(deleteInputsInvoiceItem)
                .catch(errorHandler)
        }

        function findGood() {
            return GoodsService.findGood(vm.index[vm.i].goodsID)
                .then(function (good) {
                    var quantity = parseFloat(good.data.quantity) - parseFloat(vm.index[vm.i].quantity);
                    vm.item = {
                        id: good.data.id,
                        name: good.data.name,
                        price: good.data.price,
                        quantity: quantity,
                        store: good.data.store,
                        description: good.data.description,
                        goodsID: vm.index[vm.i].id
                    };
                });
        }

        function editGood() {
            return GoodsService.editItem(vm.item)
                .then(function () {
                    vm.i++;
                })
                .catch(errorHandler);
        }

        function deleteInputsInvoiceItem() {
            return InputsInvoiceService.deleteItem(vm.item.goodsID)
                .then(function () {
                })
                .catch(errorHandler);
        }

        function inputsEditBack() {
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