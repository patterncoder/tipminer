(function (angular) {
    
        'use strict';
        angular.module('app').controller('tmMenuItemsCtrl', [ 'tmDataCache', 'tmNotifier', appController]);
        

        function appController(tmDataCache, tmNotifier) {
            var vm = this;
            var menuItemsCache;

            function init() {
                menuItemsCache = tmDataCache.load('MenuItems');
                console.log('in init in menuitemsctrl');
                vm.menuItems = menuItemsCache.query();
            }

            init();

            vm.pageTitle = "Production > Menu Items";
        }
    
 

})(this.angular)
   