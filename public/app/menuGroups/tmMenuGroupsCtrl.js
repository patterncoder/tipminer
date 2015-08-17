// this is another prototype attempt on ui patterns
// this is the controller for the list portion of the ui
// complemented by the controller for the modal detail ui
// the modal detail ui will be call from this controller and state can be passed 
// on the resolve key of $modal.open();
// we do need stackable modal so that we can notify when leaving page without saving

(function (angular) {

    'use strict';
    
    
    angular.module('app').controller('tmMenuGroupsCtrl', ['$modal', 'tmDataCache', 'tmModalServiceSvc', 'tmNotifier',  Controller]);

    
    function Controller($modal, tmDataCache, tmModalServiceSvc, tmNotifier) {
        var vm = this;
        vm.pageTitle = 'Production > Menu Groups';
        var menuGroupsCache;
        
        function init(){
            menuGroupsCache = tmDataCache.load('MenuGroups');
            menuGroupsCache.query().then(function(groups){
                vm.menuGroups = groups;
            });
        }
        
        
        
        vm.showModal = function () {
            
        };
        
        vm.addItem = function () {
            var modalConfig = {
                templateUrl: '/partials/common/tmModalAddItem',
                controller: 'modalMenuGroupAdd as vm'
            };
            
            var modalOptions = {
                headerText: 'Add Menu Group'
            };
            
            tmModalServiceSvc.showModal(modalConfig, modalOptions).then(function(result){
                
            });
            
        };
        
        vm.details = function (id) {
            $modal.open({
                animation: true,
                templateUrl: '/partials/menuGroups/menuGroup-detail',
                controller: 'tmMenuGroupDetailCtrl as vm',
                resolve: {itemId: function(){return id;}},
                size: 'fs'
            });
        };
        
        vm.deleteMenuGroup = function(id) {
            menuGroupsCache.remove(id).then(function(collection){
                tmNotifier.notify('The menu group has been deleted.');
                vm.menuItems = collection;
            });
        }
        
        init();
    }


}(this.angular));
   