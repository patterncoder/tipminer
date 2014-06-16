angular.module('app').factory('tmCustomer', function ($resource) {
    var CustomerResource = $resource('/api/customers/:_id', {_id: "@id"},{
        update: {method: 'PUT', isArray: false}
    });
    return CustomerResource;
});