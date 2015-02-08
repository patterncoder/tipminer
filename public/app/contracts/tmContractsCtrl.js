(function (angular) {
    angular.module('app').controller('tmContractsCtrl', ['$scope', 'tmCachedContracts', 'tmContract', 'tmDataCache', Controller]);
    function Controller($scope, tmCachedContracts, tmContract, tmDataCache) {
        $scope.pageTitle = "Events > Contracts";
        //$scope.contracts = tmCachedContracts.query();

        var contractsCache;
        function init() {

            $scope.Contracts = tmDataCache.load('Contracts').query();

        }

        init();
        //$scope.$on('loggedOut', function () { tmCachedContracts.clear(); })

        $scope.sortOptions = [{ value: "date", text: "Sort by Date" }, { value: "name", text: "Sort by Name" }];

        $scope.sortOrder = $scope.sortOptions[0].value;
    }
}(this.angular));