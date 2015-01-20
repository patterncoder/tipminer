angular.module('app').controller('tmCustomerProfileCtrl', function ($scope, $location, tmDataCache, tmCachedCustomers, tmCustomer, tmNotifier, $routeParams, $stateParams ) {

    // fired when invoked
    tmCachedCustomers.query().$promise.then(function (collection) {
        //console.log("i am here");
        if ($stateParams.id === "new") {
            $scope.customer = {};
        }
        else {
            collection.forEach(function (customer) {
                if (customer._id === $stateParams.id) {
                    $scope.customer = customer;
                }
            });
            if (typeof $scope.customer === 'undefined') { $location.path('/events/customers'); }
        }
        
        
    });

    $scope.submitCustomer = function () {
        if ($stateParams.id === "new") {
            createCustomer();
        } else {
            updateCustomer();
        }
    };

    function updateCustomer() {
        
        tmCustomer.update({ _id: $scope.customer._id }, $scope.customer).$promise.then(function () {
            tmNotifier.notify("The customer record has been updated.");
            $location.path('/events/customers');
        }, function (reason) {
            tmNotifier.error(reason);
        });
        //tmCachedCustomers.refresh();

    }

    function createCustomer() {
        var newCustomerData = {
            name: { firstName: $scope.customer.firstName, lastName: $scope.customer.lastName },
            firstName: $scope.customer.firstName,
            lastName: $scope.customer.lastName

        };
        //console.log(newCustomerData);
        var newCustomer = new tmCustomer(newCustomerData);
        newCustomer.$save().then(function (item) {
            
            tmNotifier.notify("The customer record has been added.");
            tmCachedCustomers.add(item);
            $location.path('/events/customers');
        }, function (reason) {
            tmNotifier.error(reason);
        });
        
        
    }

    


});