(function (angular) {

    'use strict';
    angular.module('app').controller('tmMenuDetailCtrl', ['tmDataCache', 'tmNotifier', '$stateParams', '$state', '$q', '$rootScope', Controller]);


    function Controller(tmDataCache, tmNotifier, $stateParams, $state, $q, $rootScope) {

        var vm = this;
        var menusCache;
        
        vm.pageTitle = "Production > Menu Detail";

        function init() {
            menusCache = tmDataCache.load('Menus');
            menusCache.getOne($stateParams.id, true).then(function(data){
                    vm.menu = data;
                });

            // if ($stateParams.newMenu) {
            //     menusCache.getOne($stateParams.id, false).then(function(data){
            //         vm.menu = data;
            //     });
            //     
            // } else {
            //     menusCache.getOne($stateParams.id, true).then(function(data){
            //         vm.menu = data;
            //     }); 
            // }
        }

        init();
        
        vm.addSection = function(newTab) {
            var NewSection = {title: 'New Section', subtitle: "", footer:""}
            vm.menu.sections.push(NewSection);
        };
        
        
        vm.submitMenu = function () {
            updateMenu();
        };
        
        function updateMenu() {
            menusCache.update(vm.menu).then(
                function () {
                    tmNotifier.notify("The menu record has been updated");
                    vm.menuDetailForm.$setPristine();
                },
                function (reason) {
                    tmNotifier.error(reason);
                }
            );
        }

    }



}(this.angular));