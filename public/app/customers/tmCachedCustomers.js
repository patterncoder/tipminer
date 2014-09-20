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
        },

        remove: function(id){

            var item = customerList.map(function(e){return e._id}).indexOf(id);
            customerList.splice(item, 1);

            return customerList;
        }
    }
});