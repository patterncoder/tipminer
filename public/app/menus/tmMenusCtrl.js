(function(angular){
	'use strict';
	angular.module('app').controller('tmMenusCtrl',
		['tmDataCache', 'tmNotifier', '$state', Controller]);
		
	function Controller(tmDataCache, tmNotifier, $state){
		var vm = this;
		var menusCache;
		function init(){
			menusCache = tmDataCache.load('Menus');
			menusCache.query().then(function(data){
                //console.log(data);
                vm.menus = data;
            });
            // vm.menus = menusCache.query();
            // console.log(vm.menus);
			
		}
		
		init();
		vm.pageTitle = "Production > Menus";
		
		
		vm.sortOptions = [{ value: "menuName", text: "Sort by Menu Name" }, { value: "menuDateCreate", text: "Sort by Date Created" }];

        vm.sortOrder = vm.sortOptions[0].value;
		
		vm.deleteMenu = function (id) {

            menusCache.remove(id).then(function(collection){
                vm.menus = collection;
            })
            
			
        };
        
        vm.addMenu = function (){
            
            menusCache.add({title:"(new menu)"}).then(function(data){
                $state.go('menuDetail', { id: data._id, newMenu: true, callingState: 'menuDetail' });
            });
            
        };
		
	}
	
}(this.angular));