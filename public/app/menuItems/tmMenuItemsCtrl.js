(function (angular) {

    'use strict';
    angular.module('app').controller('tmMenuItemsCtrl', ['tmDataCache', 'tmNotifier', Controller]);


    function Controller(tmDataCache, tmNotifier) {

        var vm = this;
        var menuItemsCache;

        function init() {
            menuItemsCache = tmDataCache.load('MenuItems');
            
            vm.menuItems = menuItemsCache.query();
           
            
        }

        init();

        vm.pageTitle = "Production > Menu Items";
        vm.deleteMenuItem = function (id) {

            vm.menuItems = menuItemsCache.remove(id);
        };
    }



}(this.angular));
   