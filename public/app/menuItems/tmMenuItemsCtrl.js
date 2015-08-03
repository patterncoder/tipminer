(function (angular) {

    'use strict';
    angular.module('app').controller('tmMenuItemsCtrl', ['tmDataCache', 'tmNotifier', Controller]);


    function Controller(tmDataCache, tmNotifier) {

        var vm = this;
        var menuItemsCache;

        function init() {
            
            
            menuItemsCache = tmDataCache.load('MenuItems');
            menuItemsCache.query().then(function(collection){
                vm.menuItems = collection;
            });
            
           
            
        }

        init();

        vm.pageTitle = "Production > Menu Items";
        vm.deleteMenuItem = function (id) {
            menuItemsCache.remove(id).then(function(collection){
                vm.menuItems = collection;
            });
            
        };
    }



}(this.angular));
   