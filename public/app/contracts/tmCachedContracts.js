(function (angular) {
    angular.module('app').factory('tmCachedContracts', ['tmContract',Factory]);
    function Factory(tmContract){
        var contractList;

        return {

            query: function () {

                if (!contractList) {
                    contractList = tmContract.query();
                }

                return contractList;
            },

            clear: function () {
                contractList = undefined;
            
            }
        };
    }
}(this.angular));