(function (angular) {
    'use strict';
    angular.module('app').factory('appStart', ['$rootScope', 'util', 'tmDataCache', factory]);

    function factory($rootScope, util, tmDataCache) {
        
        var appStart = {
            start: start
        };
        return appStart;

        function start() {
            util.logger.conlog('Starting up...');
            tmDataCache.init();
            
            
        }

       
    }

})(this.angular)