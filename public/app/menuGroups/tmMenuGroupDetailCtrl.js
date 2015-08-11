(function(angular){
    'use strict';
    angular.module('app').controller('tmMenuGroupDetailCtrl', ['tmModalServiceSvc', '$modalInstance', Controller]);
    
    function Controller (tmModalServiceSvc, $modalInstance) {
        var vm = this;
        vm.pageTitle = "Menu Groups";
        
        var modalOptions = {
            closeButtonText: 'Cancel',
            actionButtonText: 'Delete Customer',
            headerText: 'Delete ' + ' a name here' + '?',
            bodyText: 'Are you sure you want to delete this customer?'
        };
        vm.close = function () {
            $modalInstance.dismiss();
        };
        vm.modalAlert = function () {
            tmModalServiceSvc.showModal({}, modalOptions).then(function(result){
                //vm.pageTitle = 'fuck you!' + result;
            });
        };
    }
    
}(this.angular));