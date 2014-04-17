angular.module('app').factory('tmIdentity', function($window, tmUser){
    var currentUser;
    if(!!$window.bootstrappedUserObject) {
        currentUser = new tmUser();
        angular.extend(currentUser, $window.bootstrappedUser);

    }

    return {

        currentUser: currentUser,
        isAuthenticated: function(){
            return !!this.currentUser;
        }
    }
})