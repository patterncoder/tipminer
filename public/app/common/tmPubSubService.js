(function(angular){
    
    angular.module('app').factory('tmPubSubService', ['$rootScope', Factory])
    
    function Factory ($rootScope) {
        var addItemToList = function (item) {
            $rootScope.$broadcast('addItemToList', item);
        };
        
        var onAddItemToList = function ($scope, handler) {
            
            $scope.$on('addItemToList', function(event, item) {
                handler(item);
            });
        };
        
        return {
            addItemToList: addItemToList,
            onAddItemToList: onAddItemToList
        }
    }
    
}(this.angular));