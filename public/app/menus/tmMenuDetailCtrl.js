(function (angular) {

    'use strict';
    angular.module('app').controller('tmMenuDetailCtrl', ['tmDataCache', 'tmNotifier', '$stateParams', '$state', Controller]);


    function Controller(tmDataCache, tmNotifier, $stateParams, $state) {

        var vm = this;
        var menusCache;
        //var menuItemTags;
        //var tags;
        

        function init() {

            menusCache = tmDataCache.load('Menus');
            //menuItemTags = tmDataCache.load('Lookups');
            //vm.miTagList = menuItemTags.query();
            if ($stateParams.id === "new") {
                vm.menu = {};
            } else {
                vm.menu = menusCache.getOne($stateParams.id);
                
                
                
            }
            
        }

        init();
        // vm.addTag = function (tag) {
        //     if (vm.menuItem.category) {
        //         vm.menuItem.category = vm.menuItem.category + " " + tag;
        //     }
        //     else {
        //         vm.menuItem.category = tag;
        //     }
        //     
        // };
        vm.pageTitle = "Production > Menu Detail";
        
        vm.submitMenu = function () {
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
            menusCache.add(newMenuItem).then(
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
            
            menusCache.update(vm.menuItem).then(
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