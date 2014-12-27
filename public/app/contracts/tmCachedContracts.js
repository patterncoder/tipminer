angular.module('app').factory('tmCachedContracts', function (tmContract) {
    var contractList;

    return {

        query: function () {

            if (!contractList) {
                contractList = tmContract.query();
            }

            return contractList;
        }
    };

});