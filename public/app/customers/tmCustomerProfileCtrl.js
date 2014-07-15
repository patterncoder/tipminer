angular.module('app').controller('tmCustomerProfileCtrl', function ($scope, $location, tmCachedCustomers, tmCustomer, tmNotifier, $routeParams) {

    $scope.update = function () {
        
        tmCustomer.update({ _id: $scope.customer._id }, $scope.customer).$promise.then(function () {
            tmNotifier.notify("The customer record has been updated.");
            $location.path('/events/customers');
        }, function (reason) {
            tmNotifier.error(reason);
        });
        //tmCachedCustomers.refresh();

    }

    tmCachedCustomers.query().$promise.then(function (collection) {
        
        collection.forEach(function (customer) {
            if (customer._id === $routeParams.id) {
                $scope.customer = customer;
            }
        });
        
    });

});