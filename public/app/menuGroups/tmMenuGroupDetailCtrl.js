(function(angular){
    'use strict';
    angular.module('app').controller('tmMenuGroupDetailCtrl', ['tmDataCache','tmModalServiceSvc', '$modalInstance', 'itemId', Controller]);
    
    function Controller (tmDataCache, tmModalServiceSvc, $modalInstance, itemId) {
        var vm = this;
        var menuGroupsCache;
        vm.pageTitle = "Menu Groups";
        
        function init() {
            menuGroupsCache = tmDataCache.load('MenuGroups');
            menuGroupsCache.getOne(itemId, true).then(function(group){
                vm.menuGroup = group;
            });
        }
        
        
        var modalOptions = {
            closeButtonText: 'No',
            actionButtonText: 'Yes',
            headerText: 'Wait!',
            bodyText: 'Do you want to leave without saving??'
        };
        
        vm.close = function () {
            if(vm.menuGroupDetailForm.$pristine) {
                $modalInstance.dismiss();
            } 
            else {
                tmModalServiceSvc.showModal({}, modalOptions).then(function(result){
                $modalInstance.dismiss();
                });
            }
        };
        
        vm.saveChangesAndClose = function () {
            vm.saveChanges();
            $modalInstance.dismiss();
        };
        
        vm.saveChanges = function () {
            vm.menuGroupDetailForm.$setPristine();
        };
        
        init();
    }
    
}(this.angular));