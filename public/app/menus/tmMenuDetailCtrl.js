(function (angular) {
    'use strict';
    angular.module('app').controller('tmMenuDetailCtrl', ['$modalInstance', 'tmModalServiceSvc', 'tmDataCache', 'tmNotifier', '$stateParams', '$state', '$q', '$rootScope', 'tmPubSubService',  Controller]);

    function Controller($modalInstance, tmModalServiceSvc, tmDataCache, tmNotifier, $stateParams, $state, $q, $rootScope, tmPubSubService) {
        // see angular for documentation for and easy reset pattern to undo changes before saving
        var vm = this;
        var menusCache;
        vm.pageTitle = "Production > Menu Detail";

        function init() {
            menusCache = tmDataCache.load('Menus');
            menusCache.getOne($stateParams.id, true).then(function(data){
                    vm.menu = data;
                    vm.master = angular.copy(data);
                    // vm.menuFields = data.schema;
                });
            // need to add a listener for adding menu items
            // tmPubSubService.onAddItemToList($scope, function(item){
            //     
            //     vm.menu.sections.push(item);
            //     vm.menuDetailForm.$setDirty();
            //     
            // });
        }

        vm.menuFields = [
            {key: 'title',
                type: 'input',
                templateOptions: {
                    type: 'text',
                    label: 'Title',
                    placeholder: 'Enter Menu Title',
                    required: true
                }},
            {key: 'subtitle',
                type: 'input',
                templateOptions: {
                    type: 'text',
                    label: 'Sub Title',
                    placeholder: 'Enter Menu Subtitle',
                    required: true
                }},
            {key: 'footer',
                type: 'input',
                templateOptions: {
                    type: 'text',
                    label: 'Footer',
                    placeholder: 'Enter Menu Footer',
                    required: true
                }}
        ];
        
        vm.reset = function (){
            
            vm.menu = angular.copy(vm.master);
            vm.menuDetailForm.$setPristine();
        };
        
        vm.addSection = function(newTab) {
            var NewSection = {title: 'New Section', subtitle: "", footer:""}
            vm.menu.sections.push(NewSection);
            vm.menuDetailForm.$setDirty();
        };
        
        vm.removeSection = function () {
            // implement how to remove a menu section
        };
        
        vm.removeMenuItem = function () {
            // implement how to remove a menuitem from a section
        };
        
        // vm.submitMenu = function () {
        //     updateMenu();
        // };
        
        vm.close = function () {

            var modalOptions = {
                closeButtonText: 'No',
                actionButtonText: 'Yes',
                headerText: 'Wait!',
                bodyText: 'Do you want to leave without saving??'
            };
            
            if(vm.menuDetailForm.$pristine) {
                $modalInstance.close();
                $state.go('menus');
            } 
            else {
                tmModalServiceSvc.showModal({}, modalOptions).then(function(result){
                    console.log('just before reset');
                    vm.reset();
                    $modalInstance.close();
                    $state.go('menus');
                });
            }
        };
        
        vm.saveChangesAndClose = function () {
            vm.saveChanges();
            $modalInstance.close();
            $state.go('menus');
        };
        
        vm.saveChanges = function () {
            menusCache.update(vm.menu).then(
                function () {
                    tmNotifier.notify("The menu record has been updated");
                    vm.menuDetailForm.$setPristine();
                    vm.master = angular.copy(vm.menu);
                },
                function (reason) {
                    tmNotifier.error(reason);
                }
            );
        };
        
        
        
        init();

    }



}(this.angular));