(function(angular){
	'use strict';
	angular.module('app').controller('tmMenusCtrl',
		['tmDataCache', 'tmNotifier', Controller]);
		
	function Controller(tmDataCache, tmNotifier){
		var vm = this;
		var menusCache;
		function init(){
			menusCache = tmDataCache.load('Menus');
			vm.menus = menusCache.query();
			
		}
		
		init();
		vm.pageTitle = "Production > Menus";
		
		
		vm.sortOptions = [{ value: "menuName", text: "Sort by Menu Name" }, { value: "menuDateCreate", text: "Sort by Date Created" }];

        vm.sortOrder = vm.sortOptions[0].value;
		
		vm.deleteMenu = function (id) {

            vm.menus = menusCache.remove(id);
			
        };
		
	}
	
}(this.angular))