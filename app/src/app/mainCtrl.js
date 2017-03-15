(function () {
    'use strict';

    angular
        .module('app')
        .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$state', '$rootScope', '$timeout'];

    function MainCtrl($state, $rootScope, $timeout) {
        var vm = this;

        angular.extend(vm, {
            init: init,
            go: go,
			language: $rootScope.language
        });

        $timeout(function () {
            window.scrollTo(0, 0);
        });

        init();

        function init() {
			console.log
            $rootScope.myError = false;
            $rootScope.loading = false;
            $rootScope.message = false;
        }

        function go(state) {
            $rootScope.loading = true;
            $timeout(function () {
                $state.go(state);
            }, 100);
        }
    }

})();