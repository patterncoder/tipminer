(function(angular){
    'use strict';
    angular.module('app').controller('tmMenuGroupDetailCtrl', ['$scope','tmDataCache','tmModalServiceSvc', '$modalInstance', 'itemId','tmPubSubService', 'tmNotifier', Controller]);
    
    function Controller ($scope, tmDataCache, tmModalServiceSvc, $modalInstance, itemId, tmPubSubService, tmNotifier) {
        var vm = this;
        
        var menuGroupsCache;
        vm.pageTitle = "Menu Groups";
        
        function init() {
            menuGroupsCache = tmDataCache.load('MenuGroups');
            menuGroupsCache.getOne(itemId, true).then(function(group){
                vm.menuGroup = group;
            });
            // set up listener for items added by the menus directive
            tmPubSubService.onAddItemToList($scope, function(item){
                
                vm.menuGroup.menus.push(item);
                vm.menuGroupDetailForm.$setDirty();
                
            });
            
        }
        
        vm.close = function () {
            var modalOptions = {
                closeButtonText: 'No',
                actionButtonText: 'Yes',
                headerText: 'Wait!',
                bodyText: 'Do you want to leave without saving??'
            };
            
            if(vm.menuGroupDetailForm.$pristine) {
                $modalInstance.close();
            } 
            else {
                tmModalServiceSvc.showModal({}, modalOptions).then(function(result){
                    $modalInstance.close();
                });
            }
        };
        
        vm.saveChangesAndClose = function () {
            vm.saveChanges();
            $modalInstance.close();
        };
        
        vm.saveChanges = function () {
            delete vm.menuGroup.$promise;
            menuGroupsCache.update(vm.menuGroup).then(
                function () {
                    tmNotifier.notify("The menu group record has been updated");
                    vm.menuGroupDetailForm.$setPristine();
                    
                },
                function (reason) {
                    tmNotifier.error(reason);
                }
                );
            
        };
        
        init();
    }
    
}(this.angular));