(function(angular){
    'use strict';
    
    angular.module('app').controller('tmAddMenuItemCtrl', ['tmNotifier', '$state', '$modalInstance', 'tmDataCache', Controller]);
    
    function Controller (tmNotifier, $state, $modalInstance, tmDataCache){
        
        var vm = this;
        var menuItemsCache = tmDataCache.load('MenuItems');
        
        vm.cancel = function (){
            $modalInstance.dismiss();
        };
        
        vm.addMenuItem = function (nextScreen){
            var newMenuItem = {};
            newMenuItem.name = vm.newMenuItemName;
            newMenuItem.description = vm.newMenuItemDescription;
            menuItemsCache.add(newMenuItem).then(function(data){
                    $modalInstance.dismiss();
                    if (nextScreen === 'details') $state.go('menuItemDetail', { id: data._id, newMenu: true });
                });
        };
    }
    
}(this.angular))
