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
            //vm.title = 'Search items';
            vm.title = 'Отчеты';
			
            vm.options = [
                {name: 'Select search'},
                {name: 'Search by Name'},
                {name: 'Search by RegNum'}
            ];
            vm.search = 'Select search';
            vm.selectedItem = vm.options[0];

            $rootScope.loading = false;
            $rootScope.myError = false;
            $timeout(function () {
                $rootScope.message = false;
            }, 1000);
        }

        function updateChange(item) {
            vm.error = false;
			vm.notSelectedError = false;
            vm.search = item.name;
        }

        function searchSubmit() {
			if (vm.search == 'Select search') {
				vm.notSelectedError = true;
                return;
            }
			
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