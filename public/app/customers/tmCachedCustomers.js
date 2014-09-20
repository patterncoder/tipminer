angular.module('app').factory('tmCachedCustomers', function (tmCustomer) {
    var customerList;
    return {

        query: function () {
            if (!customerList) {
                customerList = tmCustomer.query();
            }
            return customerList;
        },

        refresh: function () {
            customerList = tmCustomer.query();
            return customerList;
        }
    }
});