angular.module('app').controller('tmMainCtrl', function($scope, tmCachedContracts){



    $scope.contracts = tmCachedContracts.query();



});