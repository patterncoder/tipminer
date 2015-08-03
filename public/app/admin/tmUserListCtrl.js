(function (angular) {
    'use strict';
    angular.module('app').controller('tmUserListCtrl', ['$scope', 'tmUser', 'tmDataCache', Controller]);
    function Controller($scope, tmUser, tmDataCache) {
        
        var vm = this;
        var userCache;
        vm.pageTitle = "Admin > Users";
        function init(){
            userCache = tmDataCache.load('Users');
            userCache.query().then(function(data){
                vm.users = data;
            });
        }
        
        init();
        vm.pageTitle = "Admin > Users";
        //$scope.users = tmUser.query();

    }
}(this.angular));
