(function (angular) {

    angular.module('app').factory('tmLookups', ['$resource', Factory]);
    function Factory($resource) {

        var LookupsResource = $resource('/api/lookups/:_id', { _id: "@id" }, {
            update: { method: 'PUT', isArray: false }
        });

        return LookupsResource;

    }

}(this.angular));