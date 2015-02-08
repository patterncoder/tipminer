(function (angular) {
    angular.module('app').factory('tmCachedBids', ['tmBid', Factory]);
    function Factory(tmBid) {
        var bidList;

        return {

            query: function () {

                if (!bidList) {
                    bidList = tmBid.query();
                }

                return bidList;
            }
        };
    }
}(this.angular));
