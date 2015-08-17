(function(angular){
    
    angular.module('app').directive('direcMenuItems', Directive);
    
    var Controller = ['$scope','tmDataCache', 'tmPubSubService', function ($scope, tmDataCache, tmPubSubService){
        tmDataCache.load('Menus').query().then(function(items){
            $scope.menus = items;
        });
        
        $scope.addMenu = function (item) {
            console.log(item);
            var newItem = {};
                newItem.menuId = item._id;
                newItem.title = item.title;
                newItem.subtitle = item.subtitle;
            console.log(newItem);
            tmPubSubService.addItemToList(newItem);
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