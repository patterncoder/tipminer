angular.module('app').controller('tmMainCtrl', function($scope, tmContract){



    $scope.contracts = tmContract.query();
});