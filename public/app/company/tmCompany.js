(function (angular) {
    angular.module('app').factory('tmCompany', ['$resource', Factory]);

    function Factory($resource) {
        var CompanyResource = $resource('/api/companies/:id', { _id: "@id" }, {
            update: { method: 'PUT', isArray: false }
        });


        return CompanyResource;
    }
}(this.angular));

