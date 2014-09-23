angular.module('app').controller('tmCustomerProfileCtrl', function ($scope, $location, tmCachedCustomers, tmCustomer, tmNotifier, $routeParams) {

    // fired when invoked
    tmCachedCustomers.query().$promise.then(function (collection) {
        if ($routeParams.id === "new") {
            $scope.customer = {};
        }
        else {
            collection.forEach(function (customer) {
            if (customer._id === $routeParams.id) {
                $scope.customer = customer;
            } 
        });}
        
        
    });

    $scope.submitCustomer = function () {
        if ($routeParams.id === "new") {
            createCustomer();
        } else {
            updateCustomer()
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
                   
        }
        console.log(newCustomerData);
        var newCustomer = new tmCustomer(newCustomerData);
        newCustomer.$save().then(function (item) {
            
            tmNotifier.notify("The customer record has been added.");
            tmCachedCustomers.add(item);
            $location.path('/events/customers');
        }, function (reason) {
            tmNotifier.error(reason);
        });
        
        
    };

    


});