(function(angular){
    
    angular.module('app').controller('modalMenuAdd', ['tmNotifier', 'tmDataCache', '$modalInstance', '$modal', '$state', Controller]);
    function Controller (tmNotifier, tmDataCache, $modalInstance, $modal, $state) {
        
        var vm = this;
        var menusCache;
        
        function init() {
            menusCache = tmDataCache.load('Menus');
        }
        
        vm.modalOptions = {
            headerText: "Add Menu"
        };
        
        vm.fields = [
            {
                name: 'meta.name',
                label: 'Menu Name',
                value: '',
                required: true
            },
            {
                name: 'title',
                label: 'Menu Title',
                value: '',
                required: true
            },
            {
                name: 'meta.description',
                label: 'Menu Description',
                value: '',
                required: false
            }
        ];
        
        vm.cancel = function() {
            $modalInstance.dismiss();
        };
        
        vm.addItem = function (nextScreen){
            var newMenu = {};
            for(var i = 0; i < vm.fields.length; i++)
            {
                newMenu[vm.fields[i].name] = vm.fields[i].value;
            }
            menusCache.add(newMenu).then(function(data){
                    tmNotifier.notify(data.title + " was successfully added.")
                    $modalInstance.dismiss();
                    if (nextScreen === 'details') {
                        $state.go('menuDetail', { id: data._id});
                    }
            });
        };
        
        init();
        
    }

}(this.angular));