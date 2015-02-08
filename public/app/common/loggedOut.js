(function (angular) {
    angular.module('app').factory('loggedOut', ['tmDataservice', Factory]);

    function Factory(tmDataservice) {
        return {
            clearCache: tmDataservice.clear
        };
    }

}(this.angular));