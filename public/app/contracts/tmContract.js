(function (angular) {
    angular.module('app').factory('tmContract', ['$resource', Factory]);
    function Factory($resource) {
        var ContractResource = $resource('/api/contracts/:_id', {_id: "@id"},{
                update: {method:'PUT', isArray:false}
            });
            return ContractResource;
    }
}(this.angular));
