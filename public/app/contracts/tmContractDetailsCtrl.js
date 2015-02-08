(function (angular) {
    angular.module('app').controller('tmContractDetailsCtrl', ['$scope', 'tmCachedContracts', '$stateParams', Factory]);
    function Factory($scope, tmCachedContracts, $stateParams) {

        tmCachedContracts.query().$promise.then(function (collection) {
            collection.forEach(function (contract) {
                if (contract._id === $stateParams.id) {
                    $scope.contract = contract;
                }
            });
        });

    }
}(this.angular));

