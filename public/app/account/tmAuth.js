(function (angular) {
    'use strict';
    

    angular.module('app').factory('tmAuth', ['$http', 'tmIdentity', '$q', 'tmUser', 'tmCompany', 'tmLoginMessageService', Factory]);
    function Factory($http, tmIdentity, $q, tmUser, tmCompany, tmLoginMessageService) {
        return {

            authenticateUser: function (username, password) {
                var dfd = $q.defer();

                $http.post('/login', { username: username, password: password }).then(function (response) {
                    if (response.data.success) {
                        /* jshint newcap: false */
                        var User = new tmUser();
                        /* jshint newcap: true */
                        angular.extend(User, response.data.user);
                        $http.defaults.headers.common.company = User.company;
                        //console.log(user);
                        tmIdentity.currentUser = User;
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
                    $http.defaults.headers.common.company = '';
                    //tmLoginMessageService.broadcastLogout();
                    dfd.resolve();
                });

                return dfd.promise;
            },

            createAccount: function (newAccountData) {
                /* jshint newcap: false */
                var NewCompany = new tmCompany(newAccountData);
                var NewUser = new tmUser(newAccountData);
                /* jshint newcap: true */
                var dfd = $q.defer();
                NewCompany.$save().then(function () {
                    tmIdentity.currentUser = NewUser;
                    dfd.resolve();
                }, function (response) {
                    dfd.reject(response.data.reason);
                });
                return dfd.promise;
            },

            createUser: function (newUserData) {
                /* jshint newcap: false */
                var newUser = new tmUser(newUserData);
                /* jshint newcap: true */
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
    }
}(this.angular));
