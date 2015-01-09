angular.module('app').controller('tmMainCtrl', function($scope, tmCachedContracts){

    $scope.restaurantName = "Baily's";

    $scope.$on('loggedOut', function () { $scope.contracts = []; tmCachedContracts.clear(); });
    $scope.$on('loggedIn', function () { $scope.contracts = tmCachedContracts.query(); })
    //$scope.contracts = tmCachedContracts.query();



});