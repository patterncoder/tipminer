angular.module('app').factory('tmAuth',function($http, tmIdentity, $q, tmUser){

    return {

        authenticateUser: function(username, password){
            var dfd = $q.defer();

            $http.post('/login', {username:username, password:password}).then(function(response){
                if(response.data.success){
                    var user = new tmUser();
                    angular.extend(user, response.data.user);
                    tmIdentity.currentUser = user;
                    dfd.resolve(true);
                } else
                {
                    dfd.resolve(false);
                }
            });

            return dfd.promise;
        },

        logoutUser: function(){
            var dfd = $q.defer();
            $http.post('/logout', {logout:true}).then(function (){
                tmIdentity.currentUser = undefined;
                dfd.resolve();
            })

            return dfd.promise;
        },

        authorizeCurrentUserForRoute: function(role) {
            if(tmIdentity.isAuthorized(role)){
                return true;
            } else {
                return $q.reject('not authorized');
            }
        }
    }

})