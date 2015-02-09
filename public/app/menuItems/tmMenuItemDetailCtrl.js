(function (angular) {

    'use strict';
    angular.module('app').controller('tmMenuItemDetailCtrl', ['tmDataCache', 'tmNotifier', '$stateParams', '$state', Controller]);


    function Controller(tmDataCache, tmNotifier, $stateParams, $state) {

        var vm = this;
        var menuItemsCache;
        var menuItemTags;
        var tags;
        

        function init() {

            menuItemsCache = tmDataCache.load('MenuItems');
            menuItemTags = tmDataCache.load('Lookups');
            if ($stateParams.id === "new") {
                vm.menuItem = {};
            } else {
                vm.menuItem = menuItemsCache.getOne($stateParams.id);
                vm.miTagList = menuItemTags.query();
                
                
            }
            
        }

        init();
        vm.addTag = function (tag) {
            vm.menuItem.category = vm.menuItem.category + " " + tag;
        }
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
                category: vm.menuItem.category
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
            
            menuItemsCache.update(vm.menuItem).then(
                function () {
                    tmNotifier.notify("The menu item record has been updated");
                    $state.go('menuItems');
                },
                function (reason) {
                    tmNotifier.error(reason);
                }
                );
        }

    }



}(this.angular));