angular.module('app').controller('tmContractsCtrl', function ($scope, tmCachedContracts, tmContract, tmDataCache) {
    $scope.pageTitle = "Events > Contracts";
    //$scope.contracts = tmCachedContracts.query();

    var contractsCache;
    function init() {
        contractsCache = tmDataCache.load('contracts');
        $scope.contracts = contractsCache.query();
        
        }

        init();
    //$scope.$on('loggedOut', function () { tmCachedContracts.clear(); })

    $scope.sortOptions = [{ value: "date", text: "Sort by Date" }, { value: "name", text: "Sort by Name" }];

    $scope.sortOrder = $scope.sortOptions[0].value;

    

});

