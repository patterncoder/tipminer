// this is another prototype attempt on ui patterns
// this is the controller for the list portion of the ui
// complemented by the controller for the modal detail ui
// the modal detail ui will be call from this controller and state can be passed 
// on the resolve key of $modal.open();
// we do need stackable modal so that we can notify when leaving page without saving

(function (angular) {

    'use strict';
    
    
    angular.module('app').controller('tmMenuGroupsCtrl', ['$modal', 'tmDataCache', 'tmModalServiceSvc', 'tmNotifier', '$state',  Controller]);

    
    function Controller($modal, tmDataCache, tmModalServiceSvc, tmNotifier, $state) {
        var vm = this;
        var menuGroupsCache;
        vm.pageTitle = 'Production > Menu Groups';
        vm.sortOptions = [{ value: "title", text: "Sort by Title" }, { value: "subtitle", text: "Sort by Sub Title" }];
        vm.sortOrder = vm.sortOptions[0].value;
        
        function init(){
            menuGroupsCache = tmDataCache.load('MenuGroups');
            menuGroupsCache.query().then(function(groups){
                vm.menuGroups = groups;
            });
        }
        
        vm.addItem = function () {
            var modalConfig = {
                templateUrl: '/partials/common/tmModalAddItem',
                controller: 'modalMenuGroupAdd as vm'
            };
            
            tmModalServiceSvc.showModal(modalConfig).then(function(result){
                
            });
            
        };
        
        vm.details = function (id) {
            $state.go('menuGroupDetail', {id: id});
            
        };
        
        vm.deleteMenuGroup = function(id) {
            menuGroupsCache.remove(id).then(function(collection){
                tmNotifier.notify('The menu group has been deleted.');
                vm.menuItems = collection;
            });
        }
        
        //run the controller initialization
        init();
    }


}(this.angular));
   