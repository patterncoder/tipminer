(function (angular) {
    angular.module('app').controller('tmCustomerProfileCtrl', ['tmDataCache', 'tmNotifier', '$stateParams', '$state', Controller]);
    
    function Controller(tmDataCache, tmNotifier, $stateParams, $state) {
        
        var vm = this;
        var customersCache;
        
        function init() {
            customersCache = tmDataCache.load('Customers');

            if ($stateParams.id === "new") {
                vm.customer = {};
            } else {
                customersCache.getOne($stateParams.id, true).then(function(data){
                    vm.customer = data;
                });
            }
        }

        init();


        vm.submitCustomer = function () {
            if ($stateParams.id === "new") {
                createCustomer();
            } else {
                updateCustomer();
            }
        };

        function updateCustomer() {
            //api doesn't like the $promise key
            delete vm.customer.$promise;
            customersCache.update(vm.customer).then(
                function () {
                    tmNotifier.notify("The customer record has been updated.");
                    $state.go('customers');
                }, function (reason) {
                    tmNotifier.error(reason);
                }
                );
        }

        function createCustomer() {
            console.log('first here');
            var newCustomerData = {
                name: { firstName: vm.customer.firstName, lastName: vm.customer.lastName },
                firstName: vm.customer.firstName,
                lastName: vm.customer.lastName
            };
            customersCache.add(newCustomerData).then(
                function () {
                    console.log('I am here');
                    tmNotifier.notify("The customer record has been added.");
                    $state.go('customers');
                },
                function (reason) {
                    tmNotifier.error(reason);
                }
                );
        }
    }
}(this.angular));
