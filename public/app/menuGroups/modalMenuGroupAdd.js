(function(angular){
    
    angular.module('app').controller('modalMenuGroupAdd', ['tmDataCache', '$modalInstance', '$modal', '$state', Controller]);
    function Controller (tmDataCache, $modalInstance, $modal, $state) {
        
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
            
            
            menuGroupsCache.add(newMenuGroup).then(function(data){
                    $modalInstance.dismiss();
                    if (nextScreen === 'details') {
                        $state.go('menuGroupDetail', { id: data._id, newMenu: true });
                    }
                });
        };
        
        init();
        
    }

}(this.angular))