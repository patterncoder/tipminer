(function(angular){
    'use strict';
    
    angular.module('app').service('tmModalServiceSvc', ['$modal', Service]);
    
    function Service ($modal) {
        var modalDefaults = {
            backdrop: true,
            keyboard: true,
            modalFade: true,
            templateUrl: '/partials/common/tmModalService'
        };
        
        var modalOptions = {
            closeButtonText: 'Close',
            actionButtonText: 'OK',
            headerText: 'Proceed?',
            bodyText: 'Perform this action?'
        };
        
        this.showModal = function(customModalDefaults, customModalOptions) {
            if(!customModalDefaults) customModalDefaults = {};
            customModalDefaults.backdrop = 'static';
            return this.show(customModalDefaults, customModalOptions);
        };
        
        this.show = function(customModalDefaults, customModalOptions){
            var tempModalDefaults = {};
            var tempModalOptions = {};
            angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);
            angular.extend(tempModalOptions, modalOptions, customModalOptions);
            
            if(!tempModalDefaults.controller){
                tempModalDefaults.controller = function ($scope, $modalInstance) {
                    $scope.modalOptions = tempModalOptions;
                    $scope.modalOptions.ok = function(result) {
                        $modalInstance.close(result);
                    };
                    $scope.modalOptions.close = function(result){
                        $modalInstance.dismiss('cancel');
                    };
                };
            }
            return $modal.open(tempModalDefaults).result;
        };
    }
    
}(this.angular));