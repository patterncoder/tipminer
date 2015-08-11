// this is another prototype attempt on ui patterns
// this is the controller for the list portion of the ui
// complemented by the controller for the modal detail ui
// the modal detail ui will be call from this controller and state can be passed 
// on the resolve key of $modal.open();
// we do need stackable modal so that we can notify when leaving page without saving

(function (angular) {

    'use strict';
    
   //'tmDataCache', 'tmModalServiceSvc',
    angular.module('app').controller('tmMenuGroupsCtrl', ['$modal', 'tmDataCache', 'tmModalServiceSvc',  Controller]);

    //tmDataCache, tmModalServiceSvc
    function Controller($modal, tmDataCache, tmModalServiceSvc) {
        var vm = this;
        vm.pageTitle = 'Whats up dude';
        
        
        function init(){
            var menuGroupsCache = tmDataCache.load('MenuGroups');
            menuGroupsCache.query().then(function(groups){
                vm.menuGroups = groups;
            });
        }
        
        var modalOptions = {
            closeButtonText: 'Cancel',
            actionButtonText: 'Delete Customer',
            headerText: 'Delete ' + ' a name here' + '?',
            bodyText: 'Are you sure you want to delete this customer?'
        };
        
        vm.showModal = function () {
            tmModalServiceSvc.showModal({}, modalOptions).then(function(result){
                vm.pageTitle = 'fuck you!' + result;
            });
        };
        
        vm.details = function (id) {
            $modal.open({
                animation: true,
                templateUrl: '/partials/menuGroups/menuGroup-detail',
                controller: 'tmMenuGroupDetailCtrl as vm',
                resolve: {itemId: function(){return id;}},
                size: 'fs'
            });
        };
        
        init();
    }


}(this.angular));
   