(function () {
    'use strict';

    angular
        .module('app')
        .controller('OutputsEditCtrl', OutputsEditCtrl);

    OutputsEditCtrl.$inject = ['$state', '$rootScope', '$filter', '$timeout', 'OutputsService', 'OutputsLocalStorage', '$stateParams'];

    function OutputsEditCtrl($state, $rootScope, $filter, $timeout, OutputsService, OutputsLocalStorage, $stateParams) {
        var vm = this;

        angular.extend(vm, {
            init: init,
            outputsSubmit: outputsSubmit,
            _editItem: editItem,
            outputsDialog: outputsDialog,
            outputsEditBack: outputsEditBack
        });

        angular.extend(vm, $stateParams.item);

        $timeout(function () {
            window.scrollTo(0, 0);
        });

		init();
        
		function init() {
            if ($stateParams.item.id == undefined) {
                $state.go('outputs');
            }

            vm.total = $filter('number')(vm.total, 2);
            $rootScope.myError = false;
            $rootScope.loading = false;
        }

        function outputsSubmit() {
            if (vm.form.$invalid) {
                return;
            }

            $rootScope.myError = false;
            $rootScope.loading = true;

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
				$state.go('outputs');
				return;
				
				OutputsService.editItem(item)
					.then(function () {
                        editItem(item);
						$rootScope.myError = false;
						$state.go('outputs-invoice', {item: item});
					})
					.catch(function () {
						$rootScope.loading = false;
						$rootScope.myError = true;
					});
			} else {
				//OutputsLocalStorage.editItem(item);
                $rootScope.loading = true;
                $timeout(function () {
                    $state.go('outputs', {item: item});
                }, 100);
            }
        }

        function editItem(item) {
            var outputs = OutputsService.outputs;
            for (var i = 0; i < outputs.length; i++) {
                if (outputs[i].id == item.id) {
                    outputs.splice(i, 1, item);
                    break;
                }
            }
        }

        function outputsDialog() {
            $rootScope.loading = true;
            $timeout(function () {
                $state.go('outputs-dialog', {item: $stateParams.item});
            }, 100);
        }

        function outputsEditBack() {
            $rootScope.loading = true;
            $timeout(function () {
                $state.go('outputs');
            }, 100);
        }
    }
})();