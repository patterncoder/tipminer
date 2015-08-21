(function(angular){
    'use strict';
    angular.module('app').controller('tmMenuGroupDetailCtrl', ['$rootScope', '$scope', '$state','tmDataCache','tmModalServiceSvc', '$modalInstance', 'itemId','tmPubSubService', 'tmNotifier', Controller]);
    
    function Controller ($rootScope, $scope, $state, tmDataCache, tmModalServiceSvc, $modalInstance, itemId, tmPubSubService, tmNotifier) {
        var vm = this;
        var menuGroupsCache;
        vm.pageTitle = "Menu Group Details";
        
        function init() {
            menuGroupsCache = tmDataCache.load('MenuGroups');
            menuGroupsCache.getOne(itemId, true).then(function(group){
                vm.menuGroup = group;
                vm.master = angular.copy(group);
            });
            // set up listener for items added by the menus directive
            tmPubSubService.onAddItemToList($scope, function(item){
                
                vm.menuGroup.menus.push(item);
                vm.menuGroupDetailForm.$setDirty();
                tmNotifier.notify(item.title + " added to list.");
                
            });
            
        }
        
        vm.menuGroupFields = [
            {
                key: 'title',
                type: 'input',
                templateOptions: {
                    type: 'text',
                    label: 'Title',
                    placeholder: 'Enter Group Title',
                    required: true
                }
            },
            {
                key: 'subtitle',
                type: 'input',
                templateOptions: {
                    type: 'text',
                    label: 'Description',
                    placeholder: 'Enter Group Title',
                    required: true
                }
            }
        ];
        
        vm.reset = function (){
            
            vm.menuGroup = angular.copy(vm.master);
            vm.menuGroupDetailForm.$setPristine();
        };
        
        vm.removeMenu = function(id) {
            for(var i = 0; i < vm.menuGroup.menus.length; i++)
            {
                if(vm.menuGroup.menus[i]._id === id)
                {
                    vm.menuGroup.menus.splice(i, 1);
                    vm.menuGroupDetailForm.$setDirty();
                    break;
                }
            }
        };
        
        
        
        vm.close = function () {

            var modalOptions = {
                closeButtonText: 'No',
                actionButtonText: 'Yes',
                headerText: 'Wait!',
                bodyText: 'Do you want to leave without saving??'
            };
            
            if(vm.menuGroupDetailForm.$pristine) {
                $modalInstance.close();
                $state.go('menuGroups');
            } 
            else {
                tmModalServiceSvc.showModal({}, modalOptions).then(function(result){
                    console.log('just before reset');
                    vm.reset();
                    $modalInstance.close();
                    $state.go('menuGroups');
                });
            }
        };
        
        vm.saveChangesAndClose = function () {
            vm.saveChanges();
            $modalInstance.close();
            $state.go('menuGroups');
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