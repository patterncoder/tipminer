angular.module('app').controller('tmContractsCtrl', function($scope, tmContract){

    $scope.contracts = tmContract.query();

    $scope.sortOptions = [{value:"date", text:"Sort by Date"},{value:"name", text:"Sort by Name"}];

    $scope.sortOrder = $scope.sortOptions[0].value;

})

