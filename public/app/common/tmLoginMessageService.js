angular.module('app').factory('tmLoginMessageService', function ($rootScope) {

    var messageService = {};

    messageService.broadcastLogin = function () {
        $rootScope.$broadcast('loggedIn');
    };

    messageService.broadcastLogout = function () {
        $rootScope.$broadcast('loggedOut');
    };

    return messageService;

});

