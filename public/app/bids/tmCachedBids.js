angular.module('app').factory('tmCachedBids', function (tmBid) {
    var bidList;

    return {

        query: function () {

            if (!bidList) {
                bidList = tmBid.query();
            }

            return bidList;
        }
    };

});