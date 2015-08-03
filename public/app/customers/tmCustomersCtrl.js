(function (angular) {
    angular.module('app').controller('tmCustomersCtrl', ['tmDataCache', 'tmNotifier', Controller]);

    function Controller(tmDataCache, tmNotifier) {
        var vm = this;
        vm.pageTitle = "Events > Customers";
        var customersCache;
        
        function init() {
            customersCache = tmDataCache.load('Customers');
            
            customersCache.query().then(function(data){
                vm.customers = data;
            });
            

        }

        init();


        vm.sortOptions = [{ value: "lastName", text: "Sort by Last Name" }, { value: "firstName", text: "Sort by First Name" }];

        vm.sortOrder = vm.sortOptions[0].value;

        vm.deleteCustomer = function (id) {

            customersCache.remove(id)
                .then(function(data){
                    tmNotifier.notify("The customer record has been removed.");
                    vm.customers = data;
                });
            


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


    }
}(this.angular));
