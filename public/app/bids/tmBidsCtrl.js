angular.module('app').controller('tmBidsCtrl', function ($scope, tmCachedBids) {

    $scope.bids = tmCachedBids.query();

    $scope.sortOptions = [{value:"date", text:"Sort by Date"},{value:"name", text:"Sort by Name"}];

    $scope.sortOrder = $scope.sortOptions[0].value;

})

