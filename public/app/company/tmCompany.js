angular.module('app').factory('tmCompany', function ($resource) {

    var CompanyResource = $resource('/api/companies/:id', { _id: "@id" }, {
        update: { method: 'PUT', isArray: false }
    });


    return CompanyResource;

});