(function(angular){
    'use strict';
    
    angular.module('app').controller('saveChangesModalCtrl', ['tmNotifier', '$state', '$modalInstance', '$rootScope', Controller]);
    
    function Controller (tmNotifier, $state, $modalInstance,$rootScope){
        
        var vm = this;
        
        vm.leaveWithoutChangesNo = function (){
            $modalInstance.dismiss();
        };
        vm.leaveWithoutChangesYes = function () {
            $modalInstance.dismiss();
            $rootScope.back(true);
        };
        // vm.cancel = function (){
        //     $modalInstance.dismiss();
        // };
        // 
        // vm.addMenuItem = function (nextScreen){
        //     var newMenuItem = {};
        //     newMenuItem.name = vm.newMenuItemName;
        //     newMenuItem.description = vm.newMenuItemDescription;
        //     menuItemsCache.add(newMenuItem).then(function(data){
        //             $modalInstance.dismiss();
        //             if (nextScreen === 'details') $state.go('menuItemDetail', { id: data._id, newMenu: true });
        //         });
        // };
    }
    
}(this.angular))