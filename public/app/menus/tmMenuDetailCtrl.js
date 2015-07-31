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
                vm.menu = menusCache.getOne($stateParams.id,true);
                console.log(vm.menu);
                
                
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
                title: vm.menu.name,
                subtitle: vm.menu.subtitle,
                footer: vm.menu.footer
            };
            menusCache.add(newMenuItem).then(
                function () {
                    tmNotifier.notify("The menu record has been added.");
                    $state.go('menus');
                },
                function (reason) {
                    tmNotifier.error(reason);
                }
                );
        }

        function updateMenuItem() {
            
            menusCache.update(vm.menu).then(
                function () {
                    tmNotifier.notify("The menu record has been updated");
                    $state.go('menus');
                },
                function (reason) {
                    tmNotifier.error(reason);
                }
                );
        }

    }



}(this.angular));