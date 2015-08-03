(function (angular) {
    angular.module('app').controller('tmContractsCtrl', ['tmDataCache', Controller]);
    
    function Controller(tmDataCache) {
        var vm = this;
        
        vm.pageTitle = "Events > Contracts";
        //$scope.contracts = tmCachedContracts.query();

        var contractsCache;
        
        function init() {
            contractsCache = tmDataCache.load('Contracts');
            contractsCache.query().then(function(data){
                vm.Contracts = data;
            });
            //vm.Contracts = tmDataCache.load('Contracts').query();

        }

        init();
        //$scope.$on('loggedOut', function () { tmCachedContracts.clear(); })

        vm.sortOptions = [{ value: "date", text: "Sort by Date" }, { value: "name", text: "Sort by Name" }];

        vm.sortOrder = vm.sortOptions[0].value;
    }
}(this.angular));