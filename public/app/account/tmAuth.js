angular.module('app').factory('tmAuth', function ($http, tmIdentity, $q, tmUser) {

    return {

        authenticateUser: function (username, password) {
            var dfd = $q.defer();

            $http.post('/login', { username: username, password: password }).then(function (response) {
                if (response.data.success) {
                    var user = new tmUser();
                    angular.extend(user, response.data.user);
                    //console.log(user);
                    tmIdentity.currentUser = user;
                    dfd.resolve(true);
                } else {
                    dfd.resolve(false);
                }
            });

            return dfd.promise;
        },

        logoutUser: function () {
            var dfd = $q.defer();
            $http.post('/logout', { logout: true }).then(function () {
                tmIdentity.currentUser = undefined;
                dfd.resolve();
            });

            return dfd.promise;
        },


        createUser: function (newUserData) {
            var newUser = new tmUser(newUserData);
            var dfd = $q.defer();

            newUser.$save().then(function () {
                tmIdentity.currentUser = newUser;
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;

        },

        updateCurrentUser: function (newUserData) {
            var dfd = $q.defer();
            var clone = angular.copy(tmIdentity.currentUser);
            angular.extend(clone, newUserData);

            clone.$update().then(function () {
                tmIdentity.currentUser = clone;
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            return dfd.promise;
        },

        authorizeCurrentUserForRoute: function (role) {
            if (tmIdentity.isAuthorized(role)) {
                return true;
            } else {
                return $q.reject('not authorized');
            }
        },

        authorizeAuthenticatedUserForRoute: function () {
            if (tmIdentity.isAuthenticated()) {
                return true;
            } else {
                return $q.reject('not authorized');
            }


        }
    };

});