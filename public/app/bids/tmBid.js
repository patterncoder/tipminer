angular.module('app').factory('tmBid', function($resource){

    var BidResource = $resource('/api/bids/:_id', {_id: "@id"},{
        update: {method:'PUT', isArray:false}
    });
    return BidResource;
});