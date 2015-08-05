(function (angular) {

    'use strict';
    angular.module('app').controller('tmMenuDetailCtrl', ['tmDataCache', 'tmNotifier', '$stateParams', '$state', '$q', Controller]);


    function Controller(tmDataCache, tmNotifier, $stateParams, $state, $q) {

        var vm = this;
        var menusCache;
        
        vm.pageTitle = "Production > Menu Detail";

        function init() {
            
            vm.callingState = $stateParams.callingState;
            
            menusCache = tmDataCache.load('Menus');
            
            if ($stateParams.newMenu) {
                menusCache.getOne($stateParams.id, false).then(function(data){
                    vm.menu = data;
                });
                
            } else {
                menusCache.getOne($stateParams.id, true).then(function(data){
                    vm.menu = data;
                }); 
            }
        }

        init();
        
        vm.addSection = function(newTab) {
            
            var NewSection = {title: 'Click me to change', subtitle: "", footer:""}
            vm.menu.sections.push(NewSection);
            
        };
        vm.showMe = false;
        vm.showEdit = function(){vm.showMe = !vm.showMe};
        
        vm.submitMenu = function () {
            if ($stateParams.id === "new") {
                createMenu('menus');
            } else {
                updateMenu();
            }
        };
        
        vm.backButton = function(){
            $state.go(vm.callingState);
        };

        function createMenu(transitionTo) {
            var deferred = $q.defer();
            var newMenu = {
                title: '(new menu)'
                
            };
            menusCache.add(newMenu).then(
                function (data) {
                    tmNotifier.notify("The menu record has been added.");
                    //if(transitionTo) $state.go(transitionTo);
                    deferred.resolve(data);
                },
                function (reason) {
                    tmNotifier.error(reason);
                }
            );
            return deferred.promise;
        }

        function updateMenu() {
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