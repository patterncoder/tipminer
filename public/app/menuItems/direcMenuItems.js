(function(angular){
    
    angular.module('app').directive('direcMenuItems', Directive);
    
    var Controller = ['$scope','tmDataCache', 'tmPubSubService', function ($scope, tmDataCache, tmPubSubService){
        tmDataCache.load('MenuItems').query().then(function(items){
            $scope.menuItems = items;
        });
        
        $scope.addMenuItem = function (item) {
            //console.log(item);
            var newMenuItem = {};
                newMenuItem._id = item._id;
                newMenuItem.name = item.title;
                newMenuItem.description = item.description;
            //console.log(newMenuItem);
            tmPubSubService.addItemToList(newMenuItem);
        };
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