(function (angular) {
    angular.module('app').factory('tmLoginMessageService',['$rootScope',Factory]);
    function Factory($rootScope){
        var messageService = {};

    messageService.broadcastLogin = function () {
        $rootScope.$broadcast('loggedIn');
    };

    messageService.broadcastLogout = function () {
        $rootScope.$broadcast('loggedOut');
    };

    return messageService;
    }

}(this.angular));
 