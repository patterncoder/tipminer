(function (angular) {

    'use strict';
    angular.module('app').controller('tmMenuItemsCtrl', ['tmDataCache', 'tmNotifier', Controller]);


    function Controller(tmDataCache, tmNotifier) {

        var vm = this;
        var menuItemsCache;

        function init() {
            menuItemsCache = tmDataCache.load('MenuItems');
            
            vm.menuItems = menuItemsCache.query();
            //menuItemsCache.query().then(function (collection) {
            //    vm.menuItems = collection;
            //    console.log(vm.menuItems + "vmMenuitems");
            //});
            
        }

        init();

        vm.pageTitle = "Production > Menu Items";
        vm.deleteMenuItem = function (id) {
            vm.menuItems = menuItemsCache.remove(id);
        };
    }



}(this.angular));
   