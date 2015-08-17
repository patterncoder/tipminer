(function(angular){
    
    angular.module('app').controller('modalMenuGroupAdd', ['tmDataCache', '$modalInstance', '$modal', Controller]);
    function Controller (tmDataCache, $modalInstance, $modal) {
        var vm = this;
        var menuGroupsCache;
        
        function init() {
            menuGroupsCache = tmDataCache.load('MenuGroups');
        }
        
        vm.modalOptions = {
            headerText: "Menu Group"
        };
        vm.fields = [
            {
                name: 'title',
                label: 'Menu Group Title',
                value: '',
                required: true
            },
            {
                name: 'subtitle',
                label: 'Menu Group Description',
                value: '',
                required: false
            }
        ];
        
        vm.cancel = function() {
            $modalInstance.dismiss();
        };
        
        vm.addItem = function (nextScreen){
            var newMenuGroup = {};
            for(var i = 0; i < vm.fields.length; i++)
            {
                newMenuGroup[vm.fields[i].name] = vm.fields[i].value;
                
            }
            console.log(newMenuGroup);
            newMenuGroup.name = vm.newMenuItemName;
            newMenuGroup.description = vm.newMenuItemDescription;
            menuGroupsCache.add(newMenuGroup).then(function(data){
                    $modalInstance.dismiss();
                    if (nextScreen === 'details') {
                        //$state.go('menuItemDetail', { id: data._id, newMenu: true });
                        $modal.open({
                            animation: true,
                            templateUrl: '/partials/menuGroups/menuGroup-detail',
                            controller: 'tmMenuGroupDetailCtrl as vm',
                            resolve: {itemId: function(){return data._id;}},
                            size: 'fs'
                        });
                    } 
                    
                    
                });
        };
        
        init();
        
    }

}(this.angular))