angular.module('app').controller('tmMainCtrl', function($scope, tmCachedContracts){

    $scope.restaurantName = "Baily's";


    $scope.contracts = tmCachedContracts.query();



});