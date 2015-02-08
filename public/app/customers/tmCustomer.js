(function (angular) {
    angular.module('app').factory('tmCustomer', ['$resource', Factory]);

    function Factory($resource) {
        var CustomerResource = $resource('/api/customers/:_id', { _id: "@id" },
        {
            update: { method: 'PUT', isArray: false }
            //,query: {method: 'GET', isArray: false}
        });
        return CustomerResource;

    }
}(this.angular));
