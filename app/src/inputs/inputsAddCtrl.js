(function () {
    'use strict';

    angular
        .module('app')
        .controller('InputsAddCtrl', InputsAddCtrl);

    InputsAddCtrl.$inject = ['$state', '$rootScope', '$filter', '$timeout', 'InputsService', 'InputsLocalStorage',
        '$stateParams', 'employees', 'departments', 'projects'];

    function InputsAddCtrl($state, $rootScope, $filter, $timeout, InputsService, InputsLocalStorage,
                           $stateParams, employees, departments, projects) {
        var vm = this;

        var optionalProject = {name: 'Select project'};
        var optionalDepartment = {name: 'Select department'};
        var optionalClient = {name: 'Select customer'};

        angular.extend(vm, $stateParams.item);

        angular.extend(vm, {
            init: init,
            updateChangeProject: updateChangeProject,
            updateChangeDepartment: updateChangeDepartment,
            selectedProject: optionalProject,
            selectedDepartment: optionalDepartment,
            selectedItem: optionalClient,
            inputsAddSubmit: inputsAddSubmit,
            _addItem: addItem,
            inputsAddBack: inputsAddBack,
            _errorHandler: errorHandler
        });

        init();

        function init() {
            if ($stateParams.item.count == undefined) {
                $state.go('inputs');
            }

            var now = new Date();
            vm.date = $filter('date')(now, 'dd/MM/yyyy H:mm:ss '); //TODO Russian style
            vm.date = $filter('date')(now, 'MM/dd/yyyy H:mm:ss ');
            vm.number = vm.count;

            vm.projects = projects;
            vm.projectsOptions = [].concat(vm.projects);
            vm.projectsOptions.unshift(optionalProject);

            vm.departments = departments;
            vm.departmentsOptions = [].concat(vm.departments);
            vm.departmentsOptions.unshift(optionalDepartment);

            vm.clients = employees;
            vm.clientsOptions = [].concat(vm.clients);
            vm.clientsOptions.unshift(optionalClient);

            $rootScope.myError = false;
            $rootScope.loading = false;
        }

        function updateChangeProject(item) {
            vm.errorProject = false;
            vm.ProjectID = item.id;
        }

        function updateChangeDepartment(item) {
            vm.errorDepartment = false;
            vm.DepartmentID = item.id;
        }

        function inputsAddSubmit() {
            if (vm.selectedProject.name == 'Select project') {
                vm.errorProject = true;
            }

            if (vm.selectedDepartment.name == 'Select department') {
                vm.errorDepartment = true;
            }

            if (vm.errorProject == true || vm.errorDepartment == true) {
                return;
            }

            if (vm.form.$invalid) {
                return;
            }

            $rootScope.myError = false;
            $rootScope.loading = true;

            var id = (Math.random() * 1000000).toFixed();
            var item = {
                id: id,
                number: vm.number,
                project: vm.selectedProject.name,
                projectID: vm.ProjectID,
                department: vm.selectedDepartment.name,
                departmentID: vm.DepartmentID,
                date: vm.date,
                total: 0,
                description: vm.description
            };

            if ($rootScope.mode == 'ON-LINE (Heroku)') {
                InputsService.addItem(item)
                    .then(function () {
                        addItem(item);
                        $rootScope.myError = false;
                        $state.go('inputs-edit', {item: item});
                    })
                    .catch(errorHandler);
            } else {
                InputsLocalStorage.addItem(item);
                $rootScope.loading = true;
                $timeout(function () {
                    $state.go('inputs-edit', {item: item});
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