angular.module('app').controller('tmContractDetailsCtrl', function ($scope, tmCachedContracts, $routeParams) {

    tmCachedContracts.query().$promise.then(function (collection) {
        collection.forEach(function (contract) {
            if (contract._id === $routeParams.id) {
                $scope.contract = contract;
            }
        });
    });

});