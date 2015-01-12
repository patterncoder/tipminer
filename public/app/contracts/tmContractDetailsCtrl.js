angular.module('app').controller('tmContractDetailsCtrl', function ($scope, tmCachedContracts, $stateParams) {

    tmCachedContracts.query().$promise.then(function (collection) {
        collection.forEach(function (contract) {
            if (contract._id === $stateParams.id) {
                $scope.contract = contract;
            }
        });
    });

});