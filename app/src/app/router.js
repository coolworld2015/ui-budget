(function () {
    'use strict';

    angular
        .module('app')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routeConfig($stateProvider, $urlRouterProvider) {

        function resolveResource(url, state, sort) {
            resolver.$inject = ['$http', '$q', '$rootScope', 'EmployeesLocalStorage', 'EmployeesService',
                'GoodsLocalStorage', 'GoodsService', 'UsersLocalStorage', 'UsersService',
                'InputsLocalStorage', 'InputsService', 'OutputsLocalStorage', 'OutputsService',
                'InputsInvoiceLocalStorage', 'InputsInvoiceService',
                'OutputsInvoiceLocalStorage', 'OutputsInvoiceService',
                'ProjectsLocalStorage', 'ProjectsService',
                'DepartmentsLocalStorage', 'DepartmentsService'];
            function resolver($http, $q, $rootScope, EmployeesLocalStorage, EmployeesService,
                              GoodsLocalStorage, GoodsService, UsersLocalStorage, UsersService,
                              InputsLocalStorage, InputsService, OutputsLocalStorage, OutputsService,
                              InputsInvoiceLocalStorage, InputsInvoiceService,
                              OutputsInvoiceLocalStorage, OutputsInvoiceService,
                              ProjectsLocalStorage, ProjectsService,
                              DepartmentsLocalStorage, DepartmentsService) {

                var data;
                var webUrl = $rootScope.myConfig.webUrl;

                if ($rootScope.mode == 'OFF-LINE (LocalStorage)') {
                    switch (state) {
                        case 'store':
                            data = GoodsLocalStorage.getGoods();
                            return data;
                            break;

                        case 'goods':
                            data = GoodsLocalStorage.getGoods();
                            return data;
                            break;

                        case 'employees':
                            data = EmployeesLocalStorage.getEmployees();
                            return data;
                            break;

                        case 'projects':
                            data = ProjectsLocalStorage.getProjects();
                            return data;
                            break;

                        case 'departments':
                            data = DepartmentsLocalStorage.getDepartments();
                            return data;
                            break;

                        case 'users':
                            data = UsersLocalStorage.getUsers();
                            return data;
                            break;

                        case 'inputs':
                            data = InputsLocalStorage.getInputs();
                            return data;
                            break;

                        case 'outputs':
                            data = OutputsLocalStorage.getOutputs();
                            return data;
                            break;

                        case 'inputInvoices':
                            data = InputsInvoiceLocalStorage.getInputInvoice();
                            return data;
                            break;

                        case 'outputInvoices':
                            data = OutputsInvoiceLocalStorage.getOutputInvoice();
                            return data;
                            break;
                    }
                } else {
                    switch (state) {
                        case 'goods':
                            if ($rootScope.goods === undefined) {
								return $http.get(webUrl + url,
									{
										headers: {'Authorization': $rootScope.access_token}
									})
                                    .then(function (result) {
                                        GoodsService.goods = result.data;
                                        $rootScope.goods = true;
                                        $rootScope.loading = false;
                                        return GoodsService.goods.sort(sort);
                                    })
                                    .catch(function (reject) {
                                        $rootScope.loading = false;
                                        $rootScope.myError = true;
                                        return $q.reject(reject);
                                    });
                            } else {
                                return GoodsService.goods.sort(sort);
                            }
                            break;

                        case 'departments':
                            if ($rootScope.departments === undefined) {
								return $http.get(webUrl + url,
									{
										headers: {'Authorization': $rootScope.access_token}
									})
                                    .then(function (result) {
                                        DepartmentsService.departments = result.data;
                                        $rootScope.departments = true;
                                        $rootScope.loading = false;
                                        return DepartmentsService.departments.sort(sort);
                                    })
                                    .catch(function (reject) {
                                        $rootScope.loading = false;
                                        $rootScope.myError = true;
                                        return $q.reject(reject);
                                    });
                            } else {
                                return DepartmentsService.departments.sort(sort);
                            }
                            break;

                        case 'projects':
                            if ($rootScope.projects === undefined) {
								return $http.get(webUrl + url,
									{
										headers: {'Authorization': $rootScope.access_token}
									})
                                    .then(function (result) {
                                        ProjectsService.projects = result.data;
                                        $rootScope.projects = true;
                                        $rootScope.loading = false;
                                        return ProjectsService.projects.sort(sort);
                                    })
                                    .catch(function (reject) {
                                        $rootScope.loading = false;
                                        $rootScope.myError = true;
                                        return $q.reject(reject);
                                    });
                            } else {
                                return ProjectsService.projects.sort(sort);
                            }
                            break;

                        case 'employees':
                            if ($rootScope.employees === undefined) {
								return $http.get(webUrl + url,
									{
										headers: {'Authorization': $rootScope.access_token}
									})
                                    .then(function (result) {
                                        EmployeesService.employees = result.data;
                                        $rootScope.employees = true;
                                        $rootScope.loading = false;
                                        return EmployeesService.employees.sort(sort);
                                    })
                                    .catch(function (reject) {
                                        $rootScope.loading = false;
                                        $rootScope.myError = true;
                                        return $q.reject(reject);
                                    });
                            } else {
                                return EmployeesService.employees.sort(sort);
                            }
                            break;

                        case 'users':
                            if ($rootScope.users === undefined) {
								return $http.get(webUrl + url,
									{
										headers: {'Authorization': $rootScope.access_token}
									})
                                    .then(function (result) {
                                        UsersService.users = result.data;
                                        $rootScope.users = true;
                                        $rootScope.loading = false;
                                        return UsersService.users.sort(sort);
                                    })
                                    .catch(function (reject) {
                                        $rootScope.loading = false;
                                        $rootScope.myError = true;
                                        return $q.reject(reject);
                                    });
                            } else {
                                return UsersService.users.sort(sort);
                            }
                            break;

                        case 'inputs':
                            if ($rootScope.inputs === undefined) {
								return $http.get(webUrl + url,
									{
										headers: {'Authorization': $rootScope.access_token}
									})
                                    .then(function (result) {
                                        InputsService.inputs = result.data;
                                        $rootScope.inputs = true;
                                        $rootScope.loading = false;
                                        return InputsService.inputs;
                                    })
                                    .catch(function (reject) {
                                        $rootScope.loading = false;
                                        $rootScope.myError = true;
                                        return $q.reject(reject);
                                    });
                            } else {
                                return InputsService.inputs;
                            }
                            break;

                        case 'outputs':
                            if ($rootScope.outputs === undefined) {
								return $http.get(webUrl + url,
									{
										headers: {'Authorization': $rootScope.access_token}
									})
                                    .then(function (result) {
                                        OutputsService.outputs = result.data;
                                        $rootScope.outputs = true;
                                        $rootScope.loading = false;
                                        return OutputsService.outputs;
                                    })
                                    .catch(function (reject) {
                                        $rootScope.loading = false;
                                        $rootScope.myError = true;
                                        return $q.reject(reject);
                                    });
                            } else {
                                return OutputsService.outputs;
                            }
                            break;

                        case 'inputInvoices':
                            if ($rootScope.inputInvoices === undefined) {
								return $http.get(webUrl + url,
									{
										headers: {'Authorization': $rootScope.access_token}
									})
                                    .then(function (result) {
                                        InputsInvoiceService.inputInvoices = result.data;
                                        $rootScope.inputInvoices = true;
                                        $rootScope.loading = false;
                                        return InputsInvoiceService.inputInvoices;
                                    })
                                    .catch(function (reject) {
                                        $rootScope.loading = false;
                                        $rootScope.myError = true;
                                        return $q.reject(reject);
                                    });
                            } else {
                                return InputsInvoiceService.inputInvoices;
                            }
                            break;

                        case 'outputInvoices':
                            if ($rootScope.outputInvoices === undefined) {
								return $http.get(webUrl + url,
									{
										headers: {'Authorization': $rootScope.access_token}
									})
                                    .then(function (result) {
                                        OutputsInvoiceService.outputInvoices = result.data;
                                        $rootScope.outputInvoices = true;
                                        $rootScope.loading = false;
                                        return OutputsInvoiceService.outputInvoices;
                                    })
                                    .catch(function (reject) {
                                        $rootScope.loading = false;
                                        $rootScope.myError = true;
                                        return $q.reject(reject);
                                    });
                            } else {
                                return OutputsInvoiceService.outputInvoices;
                            }
                            break;

                        case 'audit':
							return $http.get(webUrl + url,
								{
									headers: {'Authorization': $rootScope.access_token}
								})
                                .then(function (result) {
                                    $rootScope.loading = false;
                                    return result.data;
                                })
                                .catch(function (reject) {
                                    $rootScope.loading = false;
                                    $rootScope.myError = true;
                                    return $q.reject(reject);
                                });
                            break;
                    }

                }
            }

            return resolver;
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

        //function sortNumber(a, b) {
        //    return parseInt(a.number) - parseInt(b.number);
        //}

        $stateProvider
            .state('main', {
                url: '/main',
                data: {
                    requireLogin: true
                },
                templateUrl: 'app/main.html',
                controller: 'MainCtrl',
                controllerAs: 'mainCtrl'
            })
//-------------------------------------------------------------------------------------------------------
            .state('login', {
                url: '/login',
                data: {
                    requireLogin: false
                },
                templateUrl: 'login/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'loginCtrl'
            })
//-------------------------------------------------------------------------------------------------------
            .state('audit', {
                url: '/audit',
                data: {
                    requireLogin: true
                },
                templateUrl: 'audit/audit.html',
                controller: 'AuditCtrl',
                controllerAs: 'auditCtrl',
                resolve: {
                    audit: resolveResource('api/audit/get', 'audit', sort)
                }
            })

            .state('audit-edit', {
                url: '/audit-edit',
                data: {
                    requireLogin: true
                },
                params: {item: {}},
                templateUrl: 'audit/audit-edit.html',
                controller: 'AuditEditCtrl',
                controllerAs: 'auditEditCtrl'
            })
//-------------------------------------------------------------------------------------------------------
            .state('config', {
                url: '/config',
                data: {
                    requireLogin: true
                },
                templateUrl: 'config/config.html',
                controller: 'ConfigCtrl',
                controllerAs: 'configCtrl'
            })
//-------------------------------------------------------------------------------------------------------
            .state('search', {
                url: '/search',
                data: {
                    requireLogin: true
                },
                templateUrl: 'search/search.html',
                controller: 'SearchCtrl',
                controllerAs: 'searchCtrl'
            })

            .state('search-results', {
                url: '/search-results?name?search?finds',
                data: {
                    requireLogin: true
                },
                templateUrl: 'search/search-results.html',
                controller: 'SearchResultsCtrl',
                controllerAs: 'searchResultsCtrl',
                resolve: {
                    items: ['$http', '$stateParams', '$rootScope', 'ItemsLocalStorage',
                        function ($http, $stateParams, $rootScope, ItemsLocalStorage) {
                            var api;
                            var name = $stateParams.name;
                            var type = $stateParams.search;
                            if ($rootScope.mode == 'OFF-LINE (LocalStorage)') {
                                return ItemsLocalStorage.findByName(name);
                            } else {
                                if (type == 'Search by Name') {
                                    api = 'api/items/findByName/';
                                } else {
                                    api = 'api/items/findByRegNum/';
                                }

                                var webUrl = $rootScope.myConfig.webUrl + api;
                                return $http.get(webUrl + name)
                                    .then(function (data) {
                                        return data.data;
                                    })
                                    .catch(function () {
                                        $rootScope.loading = false;
                                        $rootScope.error = true;
                                        return [];
                                    });
                            }
                        }]
                }
            })
//-------------------------------------------------------------------------------------------------------
            .state('store', {
                url: '/store',
                data: {
                    requireLogin: true
                },
                templateUrl: 'store/store.html',
                controller: 'StoreCtrl',
                controllerAs: 'storeCtrl',
                resolve: {
                    goods: resolveResource('api/goods/get', 'goods', sort)
                }
            })
//-------------------------------------------------------------------------------------------------------
            .state('goods', {
                url: '/goods',
                data: {
                    requireLogin: true
                },
                templateUrl: 'goods/goods.html',
                controller: 'GoodsCtrl',
                controllerAs: 'goodsCtrl',
                resolve: {
                    goods: resolveResource('api/goods/get', 'goods', sort)
                }
            })

            .state('goods-add', {
                url: '/goods-add',
                data: {
                    requireLogin: true
                },
                params: {item: {}},
                templateUrl: 'goods/goods-add.html',
                controller: 'GoodsAddCtrl',
                controllerAs: 'goodsAddCtrl'
            })

            .state('goods-edit', {
                url: '/goods-edit',
                data: {
                    requireLogin: true
                },
                params: {item: {}},
                templateUrl: 'goods/goods-edit.html',
                controller: 'GoodsEditCtrl',
                controllerAs: 'goodsEditCtrl'
            })

            .state('goods-dialog', {
                url: '/goods-dialog',
                data: {
                    requireLogin: true
                },
                params: {item: {}},
                templateUrl: 'goods/goods-dialog.html',
                controller: 'GoodsDialogCtrl',
                controllerAs: 'goodsDialogCtrl'
            })
//-------------------------------------------------------------------------------------------------------
            .state('employees', {
                url: '/employees',
                data: {
                    requireLogin: true
                },
                templateUrl: 'employees/employees.html',
                controller: 'EmployeesCtrl',
                controllerAs: 'employeesCtrl',
                resolve: {
                    employees: resolveResource('api/employees/get', 'employees', sort)
                }
            })

            .state('employees-add', {
                url: '/employees-add',
                data: {
                    requireLogin: true
                },
                templateUrl: 'employees/employees-add.html',
                controller: 'EmployeesAddCtrl',
                controllerAs: 'employeesAddCtrl'
            })

            .state('employees-edit', {
                url: '/employees-edit',
                data: {
                    requireLogin: true
                },
                params: {item: {}},
                templateUrl: 'employees/employees-edit.html',
                controller: 'EmployeesEditCtrl',
                controllerAs: 'employeesEditCtrl'
            })

            .state('employees-dialog', {
                url: '/employees-dialog',
                data: {
                    requireLogin: true
                },
                params: {item: {}},
                templateUrl: 'employees/employees-dialog.html',
                controller: 'EmployeesDialogCtrl',
                controllerAs: 'employeesDialogCtrl'
            })
//-------------------------------------------------------------------------------------------------------
            .state('projects', {
                url: '/projects',
                data: {
                    requireLogin: true
                },
                templateUrl: 'projects/projects.html',
                controller: 'ProjectsCtrl',
                controllerAs: 'projectsCtrl',
                resolve: {
                    projects: resolveResource('api/projects/get', 'projects', sort)
                }
            })

            .state('projects-add', {
                url: '/projects-add',
                data: {
                    requireLogin: true
                },
                templateUrl: 'projects/projects-add.html',
                controller: 'ProjectsAddCtrl',
                controllerAs: 'projectsAddCtrl'
            })

            .state('projects-edit', {
                url: '/projects-edit',
                data: {
                    requireLogin: true
                },
                params: {item: {}},
                templateUrl: 'projects/projects-edit.html',
                controller: 'ProjectsEditCtrl',
                controllerAs: 'projectsEditCtrl'
            })

            .state('projects-dialog', {
                url: '/projects-dialog',
                data: {
                    requireLogin: true
                },
                params: {item: {}},
                templateUrl: 'projects/projects-dialog.html',
                controller: 'ProjectsDialogCtrl',
                controllerAs: 'projectsDialogCtrl'
            })
//-------------------------------------------------------------------------------------------------------
            .state('departments', {
                url: '/departments',
                data: {
                    requireLogin: true
                },
                templateUrl: 'departments/departments.html',
                controller: 'DepartmentsCtrl',
                controllerAs: 'departmentsCtrl',
                resolve: {
                    departments: resolveResource('api/departments/get', 'departments', sort)
                }
            })

            .state('departments-add', {
                url: '/departments-add',
                data: {
                    requireLogin: true
                },
                templateUrl: 'departments/departments-add.html',
                controller: 'DepartmentsAddCtrl',
                controllerAs: 'departmentsAddCtrl'
            })

            .state('departments-edit', {
                url: '/departments-edit',
                data: {
                    requireLogin: true
                },
                params: {item: {}},
                templateUrl: 'departments/departments-edit.html',
                controller: 'DepartmentsEditCtrl',
                controllerAs: 'departmentsEditCtrl'
            })

            .state('departments-dialog', {
                url: '/departments-dialog',
                data: {
                    requireLogin: true
                },
                params: {item: {}},
                templateUrl: 'departments/departments-dialog.html',
                controller: 'DepartmentsDialogCtrl',
                controllerAs: 'departmentsDialogCtrl'
            })
//-------------------------------------------------------------------------------------------------------
            .state('inputs', {
                url: '/inputs',
                data: {
                    requireLogin: true
                },
                templateUrl: 'inputs/inputs.html',
                controller: 'InputsCtrl',
                controllerAs: 'inputsCtrl',
                resolve: {
                    inputs: resolveResource('api/inputs/get', 'inputs', sort)
                }
            })

            .state('inputs-add', {
                url: '/inputs-add',
                data: {
                    requireLogin: true
                },
                params: {item: {}},
                templateUrl: 'inputs/inputs-add.html',
                controller: 'InputsAddCtrl',
                controllerAs: 'inputsAddCtrl',
                resolve: {
                    projects: resolveResource('api/projects/get', 'projects', sort),
                    departments: resolveResource('api/departments/get', 'departments', sort),
                    employees: resolveResource('api/employees/get', 'employees', sort),
					goods: resolveResource('api/goods/get', 'goods', sort)
                }
            })

            .state('inputs-edit', {
                url: '/inputs-edit',
                data: {
                    requireLogin: true
                },
                params: {item: {}},
                templateUrl: 'inputs/inputs-edit.html',
                controller: 'InputsEditCtrl',
                controllerAs: 'inputsEditCtrl'
            })

            .state('inputs-dialog', {
                url: '/inputs-dialog',
                data: {
                    requireLogin: true
                },
                params: {item: {}},
                templateUrl: 'inputs/inputs-dialog.html',
                controller: 'InputsDialogCtrl',
                controllerAs: 'inputsDialogCtrl'
            })

            .state('inputs-invoice', {
                url: '/inputs-invoice',
                data: {
                    requireLogin: true
                },
                params: {item: {}},
                templateUrl: 'inputs/inputs-invoice.html',
                controller: 'InputsInvoiceCtrl',
                controllerAs: 'inputsInvoiceCtrl',
                resolve: {
                    inputInvoices: resolveResource('api/invoicein/get', 'inputInvoices', sort)
                }
            })

            .state('inputs-invoice-add', {
                url: '/inputs-invoice-add',
                data: {
                    requireLogin: true
                },
                params: {item: {}},
                templateUrl: 'inputs/inputs-invoice-add.html',
                controller: 'InputsInvoiceAddCtrl',
                controllerAs: 'inputsInvoiceAddCtrl',
                resolve: {
                    goods: resolveResource('api/goods/get', 'goods', sort)
                }
            })

            .state('inputs-invoice-edit', {
                url: '/inputs-invoice-edit',
                data: {
                    requireLogin: true
                },
                params: {item: {}, invoice: {}},
                templateUrl: 'inputs/inputs-invoice-edit.html',
                controller: 'InputsInvoiceEditCtrl',
                controllerAs: 'inputsInvoiceEditCtrl'
            })

            .state('inputs-invoice-dialog', {
                url: '/inputs-invoice-dialog',
                data: {
                    requireLogin: true
                },
                params: {item: {}, invoice: {}},
                templateUrl: 'inputs/inputs-invoice-dialog.html',
                controller: 'InputsInvoiceDialogCtrl',
                controllerAs: 'inputsInvoiceDialogCtrl'
            })
//-------------------------------------------------------------------------------------------------------
            .state('outputs', {
                url: '/outputs',
                data: {
                    requireLogin: true
                },
                templateUrl: 'outputs/outputs.html',
                controller: 'OutputsCtrl',
                controllerAs: 'outputsCtrl',
                resolve: {
                    outputs: resolveResource('api/outputs/get', 'outputs', sort)
                }
            })

            .state('outputs-add', {
                url: '/outputs-add',
                data: {
                    requireLogin: true
                },
                params: {item: {}},
                templateUrl: 'outputs/outputs-add.html',
                controller: 'OutputsAddCtrl',
                controllerAs: 'outputsAddCtrl',
                resolve: {
                    projects: resolveResource('api/projects/get', 'projects', sort),
                    departments: resolveResource('api/departments/get', 'departments', sort),
                    employees: resolveResource('api/employees/get', 'employees', sort),
					goods: resolveResource('api/goods/get', 'goods', sort)
                }
            })

            .state('outputs-edit', {
                url: '/outputs-edit',
                data: {
                    requireLogin: true
                },
                params: {item: {}},
                templateUrl: 'outputs/outputs-edit.html',
                controller: 'OutputsEditCtrl',
                controllerAs: 'outputsEditCtrl'
            })

            .state('outputs-dialog', {
                url: '/outputs-dialog',
                data: {
                    requireLogin: true
                },
                params: {item: {}},
                templateUrl: 'outputs/outputs-dialog.html',
                controller: 'OutputsDialogCtrl',
                controllerAs: 'outputsDialogCtrl'
            })

            .state('outputs-invoice', {
                url: '/outputs-invoice',
                data: {
                    requireLogin: true
                },
                params: {item: {}},
                templateUrl: 'outputs/outputs-invoice.html',
                controller: 'OutputsInvoiceCtrl',
                controllerAs: 'outputsInvoiceCtrl',
                resolve: {
                    outputInvoices: resolveResource('api/invoiceout/get', 'outputInvoices', sort)
                }
            })

            .state('outputs-invoice-add', {
                url: '/outputs-invoice-add',
                data: {
                    requireLogin: true
                },
                params: {item: {}},
                templateUrl: 'outputs/outputs-invoice-add.html',
                controller: 'OutputsInvoiceAddCtrl',
                controllerAs: 'outputsInvoiceAddCtrl',
                resolve: {
                    goods: resolveResource('api/goods/get', 'goods', sort)
                }
            })

            .state('outputs-invoice-edit', {
                url: '/outputs-invoice-edit',
                data: {
                    requireLogin: true
                },
                params: {item: {}, invoice: {}},
                templateUrl: 'outputs/outputs-invoice-edit.html',
                controller: 'OutputsInvoiceEditCtrl',
                controllerAs: 'outputsInvoiceEditCtrl'
            })

            .state('outputs-invoice-dialog', {
                url: '/outputs-invoice-dialog',
                data: {
                    requireLogin: true
                },
                params: {item: {}, invoice: {}},
                templateUrl: 'outputs/outputs-invoice-dialog.html',
                controller: 'OutputsInvoiceDialogCtrl',
                controllerAs: 'outputsInvoiceDialogCtrl'
            })
//-------------------------------------------------------------------------------------------------------
            .state('users', {
                url: '/users',
                data: {
                    requireLogin: true
                },
                templateUrl: 'users/users.html',
                controller: 'UsersCtrl',
                controllerAs: 'usersCtrl',
                resolve: {
                    users: resolveResource('api/users/get', 'users', sort)
                }
            })

            .state('users-add', {
                url: '/users-add',
                data: {
                    requireLogin: true
                },
                params: {item: {}},
                templateUrl: 'users/users-add.html',
                controller: 'UsersAddCtrl',
                controllerAs: 'usersAddCtrl'
            })

            .state('users-edit', {
                url: '/users-edit',
                data: {
                    requireLogin: true
                },
                params: {item: {}},
                templateUrl: 'users/users-edit.html',
                controller: 'UsersEditCtrl',
                controllerAs: 'usersEditCtrl'
            })

            .state('users-dialog', {
                url: '/users-dialog',
                data: {
                    requireLogin: true
                },
                params: {item: {}},
                templateUrl: 'users/users-dialog.html',
                controller: 'UsersDialogCtrl',
                controllerAs: 'usersDialogCtrl'
            });

        //$urlRouterProvider.otherwise('/login');  //TODO
        $urlRouterProvider.otherwise('/main');
//-------------------------------------------------------------------------------------------------------
    }
})();