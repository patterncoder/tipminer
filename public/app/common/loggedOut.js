(function (angular) {
    angular.module('app').factory('loggedOut',['tmDataservice', factory])

    function factory(tmDataservice) {
        return {
            clearCache: tmDataservice.clear
        }
    }

})(this.angular)