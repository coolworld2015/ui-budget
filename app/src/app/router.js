(function () {
        'use strict';

        angular
            .module('app')
            .config(routeConfig);

        routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

        function routeConfig($stateProvider, $urlRouterProvider) {

            function resolveResource(url, state, sort) {
                resolver.$inject = ['$http', '$q', '$rootScope', 'ItemsLocalStorage', 'ItemsService',
                    'UsersLocalStorage', 'UsersService'];
                function resolver($http, $q, $rootScope, ItemsLocalStorage, ItemsService,
                                  UsersLocalStorage, UsersService) {
                    var data;
                    var webUrl;

                    if ($rootScope.mode == 'OFF-LINE (LocalStorage)') {
                        switch (state) {
                            case 'items':
                                data = ItemsLocalStorage.getItems();
                                return data;
                                break;

                            case 'users':
                                data = UsersLocalStorage.getUsers();
                                return data;
                                break;
                        }
                    } else {
                        switch (state) {
                            case 'items':
                                if ($rootScope.items === undefined) {
                                    webUrl = $rootScope.myConfig.webUrl + url;
                                    return $http.get(webUrl)
                                        .then(function (result) {
                                            ItemsService.items = result.data;
                                            $rootScope.items = true;
                                            $rootScope.loading = false;
                                            return ItemsService.items.sort(sort);
                                        })
                                        .catch(function (reject) {
                                            $rootScope.loading = false;
                                            $rootScope.myError = true;
                                            return $q.reject(reject);
                                        });
                                } else {
                                    return ItemsService.items.sort(sort);
                                }
                                break;

                            case 'users':
                                if ($rootScope.users === undefined) {
                                    webUrl = $rootScope.myConfig.webUrl + url;
                                    return $http.get(webUrl)
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

                            case 'audit':
                                webUrl = $rootScope.myConfig.webUrl + url;
                                return $http.get(webUrl)
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

            function sortNumber(a, b) {
                return parseInt(a.number) - parseInt(b.number);
            }

            //$urlRouterProvider.otherwise('/login');  //TODO Change to Login
            $urlRouterProvider.otherwise('/main');

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
                                    var data = ItemsLocalStorage.findByName(name);
                                    return data;
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
                .state('items', {
                    url: '/items',
                    data: {
                        requireLogin: true
                    },
                    templateUrl: 'items/items.html',
                    controller: 'ItemsCtrl',
                    controllerAs: 'itemsCtrl',
                    resolve: {
                        items: resolveResource('api/items/get', 'items', sort)
                    }
                })

                .state('items-add', {
                    url: '/items-add',
                    data: {
                        requireLogin: true
                    },
                    params: {item: {}},
                    templateUrl: 'items/items-add.html',
                    controller: 'ItemsAddCtrl',
                    controllerAs: 'itemsAddCtrl',
                    resolve: {
                        categories: resolveResource('api/categories/get', 'categories', sort),
                        groups: resolveResource('api/groups/get', 'groups', sort)
                    }
                })

                .state('items-edit', {
                    url: '/items-edit?finds',
                    data: {
                        requireLogin: true
                    },
                    params: {item: {}},
                    templateUrl: 'items/items-edit.html',
                    controller: 'ItemsEditCtrl',
                    controllerAs: 'itemsEditCtrl'
                })

                .state('items-dialog', {
                    url: '/items-dialog',
                    data: {
                        requireLogin: true
                    },
                    params: {item: {}},
                    templateUrl: 'items/items-dialog.html',
                    controller: 'ItemsDialogCtrl',
                    controllerAs: 'itemsDialogCtrl'
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
//-------------------------------------------------------------------------------------------------------
        }
    })
();