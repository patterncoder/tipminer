angular.module('app').controller('tmContractsCtrl', function($scope, tmCachedContracts){
    $scope.pageTitle = "Events > Contracts";
    $scope.contracts = tmCachedContracts.query();

    $scope.sortOptions = [{value:"date", text:"Sort by Date"},{value:"name", text:"Sort by Name"}];

    $scope.sortOrder = $scope.sortOptions[0].value;

})

