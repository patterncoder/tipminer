(function(angular){
	'use strict';
	angular.module('app').controller('tmMenusCtrl',
		['tmDataCache', 'tmNotifier', Controller]);
		
	function Controller(tmDataCache, tmNotifier){
		var vm = this;
		var menusCache;
		function init(){
			menusCache = tmDataCache.load('Menus');
			menusCache.query().then(function(data){
                console.log(data);
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
		
	}
	
}(this.angular));