angular.module('app').controller('tmMainCtrl', function($scope, tmCachedContracts){

    $scope.restaurantName = "Baily's";

    $scope.contracts = []

    $scope.$on('loggedOut', function () { $scope.contracts = tmCachedContracts.clear(); });
    $scope.$on('loggedIn', function () { $scope.refreshList(); })
    //$scope.contracts = tmCachedContracts.query();
    $scope.refreshList = function () {
        $scope.contracts = tmCachedContracts.query();
    }
    function init() {
        $scope.refreshList();
    }

    init();

});