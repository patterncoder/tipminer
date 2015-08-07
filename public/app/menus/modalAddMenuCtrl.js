(function(angular){
    'use strict';
    
    angular.module('app').controller('tmAddMenuCtrl', ['tmNotifier', '$state', '$modalInstance', 'tmDataCache', Controller]);
    
    function Controller (tmNotifier, $state, $modalInstance, tmDataCache){
        var vm = this;
        var menusCache = tmDataCache.load('Menus');
        vm.cancel = function (){
            $modalInstance.dismiss();
        };
        
        
        
        vm.addMenu = function (nextScreen){
            if (nextScreen === 'quick')
            {
                var newMenu = {};
                newMenu.title = vm.newMenuTitle;
                newMenu.subtitle = vm.newMenuSubTitle;
                
                menusCache.add(newMenu).then(function(data){
                    $modalInstance.dismiss();
                    
                    
                });
            }
            if (nextScreen === 'details')
            {
                var newMenu = {};
                newMenu.title = vm.newMenuTitle;
                newMenu.subtitle = vm.newMenuSubTitle;
                
                menusCache.add(newMenu).then(function(data){
                    $modalInstance.dismiss();
                    $state.go('menuDetail', { id: data._id, newMenu: true });
                    
                });
            }
            
            
        };
        
    }
    
}(this.angular))
