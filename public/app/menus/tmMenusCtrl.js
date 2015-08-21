(function(angular){
	'use strict';
	angular.module('app').controller('tmMenusCtrl',
		['tmDataCache', 'tmNotifier', '$state', '$modal', 'tmModalServiceSvc', Controller]);
	
    
    
	function Controller(tmDataCache, tmNotifier, $state, $modal, tmModalServiceSvc){
        var vm = this;
        var menusCache;
        vm.pageTitle = "Production > Menus";
        vm.sortOptions = [{ value: "menuName", text: "Sort by Menu Name" }, { value: "menuDateCreate", text: "Sort by Date Created" }];
        vm.sortOrder = vm.sortOptions[0].value;
        
        
        function init(){
            menusCache = tmDataCache.load('Menus');
            menusCache.query().then(function(data){
                vm.menus = data;
            });
        }
        
        vm.addItem = function () {
            var modalConfig = {
                templateUrl: '/partials/common/tmModalAddItem',
                controller: 'modalMenuAdd as vm'
            };
            tmModalServiceSvc.showModal(modalConfig);
            // tmModalServiceSvc.showModal(modalConfig).then(function(result){
            //     
            // });
            
        };
        
        vm.details = function (id) {
            $state.go('menuDetail', {id: id});
            
        };
        
        // vm.open = function () {
        //     $modal.open({
        //         animation: true,
        //         templateUrl: '/partials/menus/modalAddMenu',
        //         controller: "tmAddMenuCtrl as vm",
        //         size: 'lg'
        //     });
        //     
        //     
        // };
		
        
		
		vm.deleteMenu = function (id) {

            menusCache.remove(id).then(function(collection){
                tmNotifier.notify('The menu has been deleted.');
                vm.menus = collection;
            })
            
			
        };
        
        //run the controller initialization
        init();
		
	}
	
}(this.angular));