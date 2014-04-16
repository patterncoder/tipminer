angular.module('app').factory('tmIdentity', function(){
    return {
        currentUser: undefined,
        isAuthenticated: function(){
            return !!this.currentUser;
        }
    }
})