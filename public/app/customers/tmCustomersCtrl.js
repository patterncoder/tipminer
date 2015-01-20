angular.module('app').controller('tmCustomersCtrl', function ($scope, tmCachedCustomers, tmDataCache, tmCustomer, tmNotifier, $q,$location) {
    $scope.pageTitle = "Events > Customers";
    var customersCache;
    function init() {
        customersCache = tmDataCache.load('customers');
        
        $scope.customers = customersCache.query();
        
    }

    init();
    
    
    $scope.sortOptions = [{ value: "lastName", text: "Sort by Last Name" }, { value: "firstName", text: "Sort by First Name" }];

    $scope.sortOrder = $scope.sortOptions[0].value;

    $scope.deleteCustomer = function (id) {

        tmCustomer.remove({ _id: id });
        tmNotifier.notify("The customer record has been removed.");
        $scope.customers = customersCache.remove(id);
        

    };


    //$scope.$on('loggedOut', function () { tmCachedCustomers.clear(); });

    //$scope.addCustomer = function () {
    //    var newCustomerData = {
    //        //collect form fields here
    //    };

    //    var newCustomer = new tmCustomer(newCustomerData);
    //    var dfd = $q.defer();
    //    newCustomer.$save().then(function () {
    //        dfd.resolve();
    //    }, function (response) {
    //        dfd.reject(response.data.reason);
    //    });
    //    return dfd.promise;


    //};

    

});