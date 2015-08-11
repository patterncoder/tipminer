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
        
		vm.sortOptions = [{ value: "menuItemName", text: "Sort by Menu Item Name" }, { value: "menuItemDateCreate", text: "Sort by Date Created" }];
        
        vm.details = function (id) {
            $modal.open({
                animation: true,
                templateUrl: '/partials/menuItems/menuItem-detail',
                controller: 'tmMenuItemDetailCtrl as vm',
                resolve: {itemId: function(){return id;}},
                size: 'fs'
            });
        };
        
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
                tmNotifier.notify('The menu item has been deleted.');
                vm.menuItems = collection;
            });
            
        };
    }



}(this.angular));
   