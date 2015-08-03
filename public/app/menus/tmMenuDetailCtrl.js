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
            
            if ($stateParams.id === "new") {
                vm.menu = {};
            } else {
                //vm.menu = menusCache.getOne($stateParams.id, true);
                menusCache.getOne($stateParams.id, true).then(function(data){
                    vm.menu = data;
                    //console.log(data);
                    //console.log(menusCache);
                });
                
                
                
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
                createMenu();
            } else {
                updateMenu();
            }
        };

        function createMenu() {
            var newMenu = {
                title: vm.menu.title,
                subtitle: vm.menu.subtitle,
                footer: vm.menu.footer
            };
            menusCache.add(newMenu).then(
                function () {
                    tmNotifier.notify("The menu record has been added.");
                    $state.go('menus');
                },
                function (reason) {
                    tmNotifier.error(reason);
                }
                );
        }

        function updateMenu() {
            console.log(menusCache);
            console.log(vm.menu);
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