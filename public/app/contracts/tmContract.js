angular.module('app').factory('tmContract', function($resource){

    var ContractResource = $resource('/api/contracts/:_id', {_id: "@id"},{
        update: {method:'PUT', isArray:false}
    });
    return ContractResource;
});