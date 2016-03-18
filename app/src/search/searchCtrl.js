(function () {
    'use strict';

    angular
        .module('app')
        .controller('SearchCtrl', SearchCtrl);

    SearchCtrl.$inject = ['$state', '$rootScope', '$timeout'];

    function SearchCtrl($state, $rootScope, $timeout) {
        var vm = this;

        angular.extend(vm, {
            init: init,
            hideError: hideError,
            updateChange: updateChange,
            searchSubmit: searchSubmit,
            searchBack: searchBack,
            _errorHandler: errorHandler
        });

        $timeout(function () {
            window.scrollTo(0, 0);
        });

        init();

        function init() {
            vm.options = [
                {name: 'Search by Name'},
                {name: 'Search by RegNum'}
            ];
            vm.search = 'Search by Name';
            vm.selectedItem = vm.options[0];

            $rootScope.loading = false;
            $rootScope.myError = false;
            $timeout(function () {
                $rootScope.message = false;
            }, 1000);
        }

        function hideError() {
            vm.minLengthError = false;
        }

        function updateChange(item) {
            vm.error = false;
            vm.search = item.name;
        }

        function searchSubmit() {
            if (vm.form.$invalid) {
                return;
            }

            if (vm.name.length < 3) {
                vm.minLengthError = true;
                return;
            }
            $rootScope.loading = true;
            $rootScope.error = false;
            $rootScope.message = false;
            $state.go('search-results', {name: vm.name, search: vm.search, finds: true});
        }

        function searchBack() {
            $rootScope.myError = false;
            $rootScope.loading = true;
            $timeout(function () {
                $state.go('main');
            }, 100);
        }

        function errorHandler() {
            $rootScope.loading = false;
            $rootScope.myError = true;
        }
    }
})();