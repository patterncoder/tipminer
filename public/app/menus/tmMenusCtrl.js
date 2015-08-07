(function(angular){
	'use strict';
	angular.module('app').controller('tmMenusCtrl',
		['tmDataCache', 'tmNotifier', '$state', '$modal', Controller]);
	
    
    
	function Controller(tmDataCache, tmNotifier, $state, $modal){
		var vm = this;
		var menusCache;
		
        function init(){
			menusCache = tmDataCache.load('Menus');
            //tmNotifier.notify("i am intialized")
			menusCache.query().then(function(data){
                vm.menus = data;
            });
            
			
		}
		
		init();
        
		vm.pageTitle = "Production > Menus";
		
        vm.open = function () {
            $modal.open({
                animation: true,
                templateUrl: '/partials/menus/modalAddMenu',
                controller: "tmAddMenuCtrl as vm"
            });
            
            
        };
		
		vm.sortOptions = [{ value: "menuName", text: "Sort by Menu Name" }, { value: "menuDateCreate", text: "Sort by Date Created" }];

        vm.sortOrder = vm.sortOptions[0].value;
		
		vm.deleteMenu = function (id) {

            menusCache.remove(id).then(function(collection){
                tmNotifier.notify('The menu has been deleted.');
                vm.menus = collection;
            })
            
			
        };
        
        
		
	}
	
}(this.angular));