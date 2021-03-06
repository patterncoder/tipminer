﻿(function (angular) {

    'use strict';
    angular.module('app').controller('tmMenuItemDetailCtrl', ['tmDataCache', 'tmNotifier', '$stateParams', '$state', Controller]);
    //('tmMenuItemDetailCtrl', ['tmDataCache', 'tmNotifier', '$stateParams', '$state', 'itemId', '$modalInstance', '$modal',  Controller])
    //function Controller(tmDataCache, tmNotifier, $stateParams, $state, itemId, $modalInstance, $modal)
    function Controller(tmDataCache, tmNotifier, $stateParams, $state) {

        var vm = this;
        var menuItemsCache;
        var menuItemTags;
        var tags;
        

        function init() {
            
            menuItemsCache = tmDataCache.load('MenuItems');
            menuItemTags = tmDataCache.load('Lookups');
            menuItemTags.query().then(function(collection){
                vm.miTagList = collection;
            });
            
            if ($stateParams.id === "new") {
                vm.menuItem = {};
            } else {
                
                menuItemsCache.getOne($stateParams.id,true).then(function(item){
                    vm.menuItem = item;
                });
                // menuItemsCache.getOne(itemId,true).then(function(item){
                //     vm.menuItem = item;
                // });
                
                
                
                
            }
            
        }

        init();
        vm.close = function(){
            if(!vm.menuItemDetailForm.$pristine){
                $modal.open({
                    animation: true,
                    templateUrl: '/partials/common/saveChangesModal',
                    controller: "saveChangesModalCtrl as vm",
                    size: 'sm'
                });
            }
            $modalInstance.dismiss();
        };
        
        vm.addTag = function (tag) {
            if (vm.menuItem.category) {
                vm.menuItem.category = vm.menuItem.category + " " + tag;
            }
            else {
                vm.menuItem.category = tag;
            }
            
        };
        vm.pageTitle = "Production > Menu Items";
        vm.submitMenuItem = function () {
            if ($stateParams.id === "new") {
                createMenuItem();
            } else {
                updateMenuItem();
            }
        };

        function createMenuItem() {
            var newMenuItem = {
                name: vm.menuItem.name,
                description: vm.menuItem.description,
                category: vm.menuItem.category,
                testField1: "test"
            };
            menuItemsCache.add(newMenuItem).then(
                function () {
                    tmNotifier.notify("The menu item record has been added.");
                    $state.go('menuItems');
                },
                function (reason) {
                    tmNotifier.error(reason);
                }
                );
        }

        function updateMenuItem() {
            delete vm.menuItem.$promise;
            menuItemsCache.update(vm.menuItem).then(
                function () {
                    tmNotifier.notify("The menu item record has been updated");
                    vm.menuItemDetailForm.$setPristine();
                    
                },
                function (reason) {
                    tmNotifier.error(reason);
                }
                );
        }

    }



}(this.angular));