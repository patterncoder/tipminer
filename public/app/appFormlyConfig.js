(function(angular){
    'use strict';
    angular.module('app').factory('appFormlyConfig',['formlyConfig',
        Factory
    ])
    
    function Factory(formlyConfig){
        
        return {
            config: config
        }
        
        function config () {
            formlyConfig.setType({
                name: 'showScope',
                templateUrl: '/partials/common/formlyTemplates/scopeTemplate'
            });
            formlyConfig.setType({
                name: 'anotherType',
                templateUrl: '/partials/common/formlyTemplates/anotherType'
            });
            
        }
    }
    
    
}(this.angular));