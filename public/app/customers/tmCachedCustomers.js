(function (angular) {
    angular.module('app').factory('tmCachedCustomers', ['tmCustomer',Factory]);
    function Factory(tmCustomer) {
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

            remove: function (id) {

                var item = customerList.map(function (e) {
                    return e._id;
                }).indexOf(id);
                customerList.splice(item, 1);

                return customerList;
            },

            add: function (customer) {
                customerList.push(customer);
                return customerList;
            },

            clear: function () {
                customerList = undefined;
            }
        };
    }
}(this.angular));
