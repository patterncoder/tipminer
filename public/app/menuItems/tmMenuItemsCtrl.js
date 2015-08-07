(function (angular) {

    'use strict';
    angular.module('app').controller('tmMenuItemsCtrl', ['tmDataCache', 'tmNotifier', '$modal', Controller]);


    function Controller(tmDataCache, tmNotifier, $modal) {

        var vm = this;
        var menuItemsCache;

        function init() {
            menuItemsCache = tmDataCache.load('MenuItems');
            menuItemsCache.query().then(function(collection){
                vm.menuItems = collection;
            });
        }

        init();

        vm.open = function () {
            $modal.open({
                animation: true,
                templateUrl: '/partials/menuItems/modalAddMenuItem',
                controller: "tmAddMenuItemCtrl as vm"
            });
        };
        
        vm.pageTitle = "Production > Menu Items";
        vm.deleteMenuItem = function (id) {
            menuItemsCache.remove(id).then(function(collection){
                vm.menuItems = collection;
            });
            
        };
    }



}(this.angular));
   