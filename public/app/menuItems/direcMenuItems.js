(function(angular){
    
    angular.module('app').directive('direcMenuItems', Directive);
    
    var Controller = ['$scope','tmDataCache', function ($scope, tmDataCache){
        tmDataCache.load('Menus').query().then(function(items){
            $scope.menus = items;
        });
    }];
    
    function Directive () {
        return {
            //template: "<p> Whats up </p>"
            scope: {},
            controller: Controller,
            templateUrl: '/partials/menuItems/direcMenuItems'
        }
    }
    
}(this.angular));