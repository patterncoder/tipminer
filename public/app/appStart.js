(function (angular) {
    angular.module('app').factory('appStart', ['$rootScope', '$location','tmDataservice', 'util', factory]);
    function factory($rootScope,$location, dataservice, util) {
        
        var appStart = {
            start: start
        };
        return appStart;

        function start() {
            util.logger.conlog('Starting up...');
            
            
        }

       
    }

})(this.angular)