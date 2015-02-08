(function (angular) {
    var app = angular.module('app', ['ngResource', 'ngRoute', 'ngCookies', 'ui.router', 'ui.bootstrap']);

    app.run(['appStart', function (appStart) {
        appStart.start();
    }]);

    angular.module('app').run(["$rootScope", "$state", "$cookieStore", "tmDataCache", function ($rootScope, $state, $cookieStore, tmDataCache) {

        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {

            if (error === 'not authorized') {
                console.log('not authorized for route');
                $state.go('home');
            }
        });

        $rootScope.$on('loggedOut', function () {
            tmDataCache.clearCache();

        });


    }]);

}(this.angular));








(function (angular) {
    angular.module('app').config(['$stateProvider', '$urlRouterProvider', '$routeProvider', '$locationProvider', '$httpProvider', Config]);

    function Config ($stateProvider, $urlRouterProvider, $routeProvider, $locationProvider, $httpProvider) {
        var routeRoleChecks = {
            admin: {
                auth: function (tmAuth) {
                    return tmAuth.authorizeCurrentUserForRoute('admin');
                }
            },
            user: {
                auth: function (tmAuth) {
                    return tmAuth.authorizeAuthenticatedUserForRoute();
                }
            }
        };

        $urlRouterProvider.otherwise('home');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/partials/main/main'
            })
            .state('signup', {
                url: '/signup',
                templateUrl: '/partials/account/signup',
                controller: 'tmSignupCtrl'
            })
            .state('login', {
                url: '/login',
                templateUrl: '/partials/account/login',
                controller: 'tmNavBarLoginCtrl'
            })
            .state('profile', {
                url: '/profile',
                templateUrl: '/partials/account/profile',
                controller: 'tmProfileCtrl',
                resolve: routeRoleChecks.user
            })
            .state('contracts', {
                url: '/events/contracts',
                templateUrl: '/partials/contracts/contracts-list',
                controller: 'tmContractsCtrl',
                resolve: routeRoleChecks.user
            })
            .state('bids', {
                url: '/bids',
                templateUrl: '/partials/bids/bids-list',
                controller: 'tmBidsCtrl',
                resolve: routeRoleChecks.user
            })
            .state('customers', {
                url: '/events/customers',
                templateUrl: '/partials/customers/customers-list',
                controller: 'tmCustomersCtrl',
                resolve: routeRoleChecks.user
            })
            .state('customerProfile', {
                url: '/events/customers/:id',
                templateUrl: '/partials/customers/customer-profile',
                controller: 'tmCustomerProfileCtrl',
                resolve: routeRoleChecks.user
            })
            .state('users', {
                url: '/admin/users',
                templateUrl: '/partials/admin/user-list',
                controller: 'tmUserListCtrl',
                resolve: routeRoleChecks.admin
            })
            .state('devnotes', {
                url: '/dev/notes',
                templateUrl: '/partials/dev/notes-list',
                controller: 'tmDevNotesCtrl',
                resolve: routeRoleChecks.admin
            })
            .state('contractDetail', {
                url: '/events/contracts/:id',
                templateUrl: '/partials/contracts/contract-details',
                controller: 'tmContractDetailsCtrl',
                resolve: routeRoleChecks.user
            })
            .state('menuItems', {
                url: '/production/menuItems',
                templateUrl: '/partials/menuItems/menuItems-list',
                resolve: routeRoleChecks.user
            })
            .state('menuItemDetail', {
                url: '/production/menuItems/:id',
                templateUrl: '/partials/menuitems/menuItem-detail',
                resolve: routeRoleChecks.user
            });


        $httpProvider.defaults.cache = false;
        if (!$httpProvider.defaults.headers.get) {
            $httpProvider.defaults.headers.get = {};
        }

        // disable IE ajax request caching
        $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';


        $locationProvider.html5Mode(true);



    }

}(this.angular));
(function (angular) {
    'use strict';
    angular.module('app').factory('appStart', ['$rootScope', 'util', 'tmDataCache', factory]);

    function factory($rootScope, util, tmDataCache) {

        var appStart = {
            start: start
        };
        return appStart;

        function start() {
            util.logger.conlog('Starting up...');
            tmDataCache.init();


        }


    }

}(this.angular));
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

(function (angular) {
    angular.module('app').directive('equals', function () {

        return {

            restrict: 'A', // only activate on element attribute
            require: '?ngModel', // get a hold of NgModelController
            link: function (scope, elem, attrs, ngModel) {
                if (!ngModel) return; // do nothing if no ng-model

                // watch own value and re-validate on change
                scope.$watch(attrs.ngModel, function () {
                    validate();
                });

                // observe the other value and re-validate on change
                attrs.$observe('equals', function (val) {
                    validate();
                });

                var validate = function () {
                    // values
                    var val1 = ngModel.$viewValue;
                    var val2 = attrs.equals;

                    // set validity
                    ngModel.$setValidity('equals', !val1 || !val2 || val1 === val2);
                };
            }
        };
    });
}(this.angular));

(function (angular) {
    angular.module('app').factory('tmIdentity', ['$window', 'tmUser', Factory]);
    function Factory($window, tmUser) {
        var currentUser;
        if (!!$window.bootstrappedUserObject) {
            currentUser = new tmUser();
            angular.extend(currentUser, $window.bootstrappedUserObject);

        }

        return {

            currentUser: currentUser,

            isAuthenticated: function () {
                return !!this.currentUser;
            },
            isAuthorized: function (role) {
                return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
            }
        };
    }
}(this.angular));

(function (angular) {
    angular.module('app').controller('tmNavBarLoginCtrl', ['$scope', '$http', '$remember', 'tmNotifier', 'util', 'tmIdentity', 'tmLoginMessageService', 'tmAuth', '$location', Controller]);
    function Controller($scope,$http,$remember,tmNotifier,util,tmIdentity,tmLoginMessageService,tmAuth,$location) {
        $scope.remember = false;

        if ($remember('username') && $remember('password')) {
            $scope.remember = true;
            $scope.username = $remember('username');
            $scope.password = $remember('password');

        }

        $scope.rememberMe = function (username, password, remember) {
            if (remember) {

                $remember('username', { value: username, expires: 10 });
                $remember('password', { value: password, expires: 10 });

                //$remember('username', username);
                //$remember('password', $scope.password);

            } else {
                $remember('username', '');
                $remember('password', '');
            }
        };

        $scope.identity = tmIdentity;

        $scope.signin = function (username, password, remember) {
            $scope.rememberMe(username, password, remember);
            tmAuth.authenticateUser(username, password).then(function (success) {
                if (success) {
                    util.logger.notify("You have successfully signed in!");
                    tmLoginMessageService.broadcastLogin();
                    $location.path('/');
                } else {

                    util.logger.notify("Username/password combination is incorrect.");
                }

            });

        };

        $scope.loginClick = function () { $location.path('/login'); };

        $scope.signout = function () {

            tmAuth.logoutUser().then(function () {
                $scope.username = "";
                $scope.password = "";
                util.logger.notify("You have successfully signed out!");
                tmLoginMessageService.broadcastLogout();
                $location.path('/');
            });
        };

    }
}(this.angular));

(function (angular) {
    angular.module('app').controller('tmProfileCtrl', ['$scope', 'tmAuth', 'tmIdentity', 'tmNotifier', Controller]);
    function Controller($scope, tmAuth, tmIdentity, tmNotifier) {
        $scope.pageTitle = "My Profile";
        $scope.email = tmIdentity.currentUser.username;
        $scope.fname = tmIdentity.currentUser.firstName;
        $scope.lname = tmIdentity.currentUser.lastName;

        $scope.update = function () {
            var newUserData = {
                username: $scope.email,
                firstName: $scope.fname,
                lastName: $scope.lname
            };

            if ($scope.password && $scope.password.length > 0) {
                newUserData.password = $scope.password;
            }

            tmAuth.updateCurrentUser(newUserData).then(function () {
                tmNotifier.notify("Your user account has been updated");

            }, function (reason) {
                tmNotifier.error(reason);
            });

        };
    }
}(this.angular));

(function (angular) {
    angular.module('app').controller('tmSignupCtrl', ['$scope', 'tmUser', 'tmNotifier', '$location', 'tmAuth', 'tmLoginMessageService', Controller]);
    function Controller($scope, tmUser, tmNotifier, $location, tmAuth, tmLoginMessageService) {
        $scope.createAccount = function () {
            var newAccountData = {
                companyName: $scope.company,
                username: $scope.email,
                password: $scope.password,
                firstName: $scope.fname,
                lastName: $scope.lname,
                roles: ["admin"]
            };

            tmAuth.createAccount(newAccountData).then(function () {

                tmLoginMessageService.broadcastLogin();

                tmNotifier.notify('Company account created');
                $location.path('/');
            }, function (reason) {
                tmNotifier.error(reason);
            });
        };

        $scope.signup = function () {
        
            var newUserData = {
                companyName: $scope.company,
                username: $scope.email,
                password: $scope.password,
                firstName: $scope.fname,
                lastName: $scope.lname
            };

            tmAuth.createUser(newUserData).then(function () {
                tmNotifier.notify('User account created');
                $location.path('/');
            }, function (reason) {
                tmNotifier.error(reason);
            });
        
        };

    }



    
}(this.angular));


(function (angular) {
    'use strict';
    angular.module('app').factory('tmUser', ['$resource', Factory]);
    function Factory($resource) {
        var UserResource = $resource('/api/users/:id', { _id: "@id" }, {
            update: { method: 'PUT', isArray: false }
        });

        //Test: returns true if has role of admin otherwise false
        UserResource.prototype.isAdmin = function () {
            return this.roles && this.roles.indexOf("admin") > -1;
        };

        return UserResource;

    }
}(this.angular));

(function (angular) {
    'use strict';
    angular.module('app').controller('tmUserListCtrl', ['$scope', 'tmUser', Controller]);
    function Controller($scope, tmUser) {
        $scope.pageTitle = "Admin > Users";
        $scope.users = tmUser.query();

    }
}(this.angular));

(function (angular) {
    angular.module('app').factory('loggedOut', ['tmDataservice', Factory]);

    function Factory(tmDataservice) {
        return {
            clearCache: tmDataservice.clear
        };
    }

}(this.angular));
(function (angular) {
angular.module('app').factory('tmDataCache', [
    'tmCachedCustomers',
    'tmCachedContracts',
    'tmContract',
    'tmCustomer',
    'tmDataEntity',
    'tmMenuItem',
    Factory]);
function Factory(tmCachedCustomers,
        tmCachedContracts,
        tmContract,
        tmCustomer,
        tmDataEntity,
        tmMenuItem){
var Cache = {
        stack: {}, //Cache stack
        load: function (id) { //Load cache if found
            return (typeof (this.stack[id]) != 'undefined') ? this.stack[id] : false;
        },
        save: function (modelCache, id) { //Cache data with unique id
            this.stack[id] = modelCache;
        },
        remove: function (id) {//Remove cache for identifier
            if (typeof (this.stack[id]) != 'undefined')
                delete this.stack[id];
        },
        clearCache: function () {
            //console.log(this.stack);
            for (var key in this.stack) {
                if (this.stack.hasOwnProperty(key)) {
                    this.stack[key].clear();
                }
            }
            
        },
        init: function () {
            this.stack = {};
            var Contracts = new tmDataEntity(tmContract);
            var Customers = new tmDataEntity(tmCustomer);
            this.save(Contracts, 'Contracts');
            this.save(Customers, 'Customers');
            this.save(new tmDataEntity(tmMenuItem), 'MenuItems');
            //this.save(tmCachedCustomers, 'customers');
            //this.save(tmCachedContracts, 'contracts');
        }
    };

    return Cache;
}
}(this.angular));

    


(function (angular) {

    angular.module('app').factory('tmDataEntity', function () {
        var List;
        function tmDataEntity(resource) {
            this.Resource = resource;

        }

        tmDataEntity.prototype = {
            query: function () {
                if (!this.List) {
                    this.List = this.Resource.query();
                }
                return this.List;
            },
            getOne: function (id) {
                var itemToReturn;
                if (!this.List) {
                    this.List = this.Resource.query();
                }
                itemToReturn = this.List.forEach(function (item) {
                    if (item._id === id) {
                        return item;
                    }
                });
                return itemToReturn;
            },
            remove: function (id) {
                var parent = this;
                this.Resource.remove({ _id: id }, function () {
                    var item = parent.List.map(function (i) {
                        return i._id;
                    }).indexOf(id);
                    parent.List.splice(item, 1);

                });
                return parent.List;

            },
            add: function (item) {
                var newItem = new this.Resource(item);
                var parent = this;
                var promise = newItem.$save(function (i) { parent.List.push(i); });

                return promise;
            },
            update: function (item) {
                var promise = this.Resource.update({ _id: item._id }, item).$promise;
                return promise;
            },
            clear: function () {
                this.List = undefined;

            }
        };

        return (tmDataEntity);

    });

}(this.angular));
(function (angular) {
    angular.module('app').factory('tmLoginMessageService',['$rootScope',Factory]);
    function Factory($rootScope){
        var messageService = {};

    messageService.broadcastLogin = function () {
        $rootScope.$broadcast('loggedIn');
    };

    messageService.broadcastLogout = function () {
        $rootScope.$broadcast('loggedOut');
    };

    return messageService;
    }

}(this.angular));
 
(function (angular) {
    angular.module('app').value('tmToastr', toastr);
    angular.module('app').factory('tmNotifier',['tmToastr', Factory]);
    function Factory (tmToastr){
        return {
            conlog: function (msg) {
                console.log(msg);
            },

            notify: function (msg) {
                tmToastr.options = {
                    "debug": false,
                    "positionClass": "toast-bottom-full-width",
                    "onclick": null,
                    "fadeIn": 300,
                    "fadeOut": 1000,
                    "timeOut": 5000,
                    "extendedTimeOut": 1000
                };
                tmToastr.success(msg);
                console.log(msg);

            },

            error: function (msg) {
                tmToastr.options = {
                    "debug": false,
                    "positionClass": "toast-bottom-full-width",
                    "onclick": null,
                    "fadeIn": 300,
                    "fadeOut": 1000,
                    "timeOut": 5000,
                    "extendedTimeOut": 1000
                };
                tmToastr.error(msg);
                console.log(msg);
            }
        };
    }
}(this.angular));


 
(function (angular) {
    angular.module('app').factory('$remember', [Factory]);
    function Factory() {
        function fetchValue(name) {
                var gCookieVal = document.cookie.split("; ");
                for (var i = 0; i < gCookieVal.length; i++) {
                    // a name/value pair (a crumb) is separated by an equal sign
                    var gCrumb = gCookieVal[i].split("=");
                    if (name === gCrumb[0]) {
                        var value = '';
                        try {
                            value = angular.fromJson(gCrumb[1]);
                        } catch (e) {
                            value = unescape(gCrumb[1]);
                        }
                        return value;
                    }
                }
                // a cookie with the requested name does not exist
                return null;
            }

            return function (name, values) {
                if (arguments.length === 1) return fetchValue(name);
                var cookie = name + '=';

                if (typeof values === 'object') {

                    var expires = '';
                    cookie += (typeof values.value === 'object') ? angular.toJson(values.value) + ';' : values.value + ';';
                    if (values.expires) {
                        var date = new Date();
                        date.setTime(date.getTime() + (values.expires * 24 * 60 * 60 * 1000));
                        expires = date.toGMTString();
                    }
                    cookie += (!values.session) ? 'expires=' + expires + ';' : '';
                    cookie += (values.path) ? 'path=' + values.path + ';' : '';
                    cookie += (values.secure) ? 'secure;' : '';
                } else {

                    cookie += values + ';';
                    console.log(cookie);
                }
                document.cookie = cookie;
            };
    }
}(this.angular));


(function (angular) {

    angular.module('app').factory('util', ['$q', 'tmNotifier', factory]);

    function factory($q, tmNotifier) {

        return {
            $q: $q,
            logger: tmNotifier,
            //$broadcast: $broadcast

        };

        //function $broadcast() {
        //    return $rootscope.$broadcast.apply($rootscope, arguments);
        //}

    }


}(this.angular));

angular.module('app').factory('tmBid', ["$resource", function($resource){

    var BidResource = $resource('/api/bids/:_id', {_id: "@id"},{
        update: {method:'PUT', isArray:false}
    });
    return BidResource;
}]);
angular.module('app').controller('tmBidsCtrl', ["$scope", "tmCachedBids", function ($scope, tmCachedBids) {

    $scope.bids = tmCachedBids.query();

    $scope.sortOptions = [{ value: "date", text: "Sort by Date" }, { value: "name", text: "Sort by Name" }];

    $scope.sortOrder = $scope.sortOptions[0].value;

}]);


(function (angular) {
    angular.module('app').factory('tmCachedBids', ['tmBid', Factory]);
    function Factory(tmBid) {
        var bidList;

        return {

            query: function () {

                if (!bidList) {
                    bidList = tmBid.query();
                }

                return bidList;
            }
        };
    }
}(this.angular));

(function (angular) {
    angular.module('app').factory('tmCompany', ['$resource', Factory]);

    function Factory($resource) {
        var CompanyResource = $resource('/api/companies/:id', { _id: "@id" }, {
            update: { method: 'PUT', isArray: false }
        });


        return CompanyResource;
    }
}(this.angular));


(function (angular) {
    angular.module('app').factory('tmCachedContracts', ['tmContract',Factory]);
    function Factory(tmContract){
        var contractList;

        return {

            query: function () {

                if (!contractList) {
                    contractList = tmContract.query();
                }

                return contractList;
            },

            clear: function () {
                contractList = undefined;
            
            }
        };
    }
}(this.angular));
(function (angular) {
    angular.module('app').factory('tmContract', ['$resource', Factory]);
    function Factory($resource) {
        var ContractResource = $resource('/api/contracts/:_id', {_id: "@id"},{
                update: {method:'PUT', isArray:false}
            });
            return ContractResource;
    }
}(this.angular));

(function (angular) {
    angular.module('app').controller('tmContractDetailsCtrl', ['$scope', 'tmCachedContracts', '$stateParams', Factory]);
    function Factory($scope, tmCachedContracts, $stateParams) {

        tmCachedContracts.query().$promise.then(function (collection) {
            collection.forEach(function (contract) {
                if (contract._id === $stateParams.id) {
                    $scope.contract = contract;
                }
            });
        });

    }
}(this.angular));


(function (angular) {
    angular.module('app').controller('tmContractsCtrl', ['$scope', 'tmCachedContracts', 'tmContract', 'tmDataCache', Controller]);
    function Controller($scope, tmCachedContracts, tmContract, tmDataCache) {
        $scope.pageTitle = "Events > Contracts";
        //$scope.contracts = tmCachedContracts.query();

        var contractsCache;
        function init() {

            $scope.Contracts = tmDataCache.load('Contracts').query();

        }

        init();
        //$scope.$on('loggedOut', function () { tmCachedContracts.clear(); })

        $scope.sortOptions = [{ value: "date", text: "Sort by Date" }, { value: "name", text: "Sort by Name" }];

        $scope.sortOrder = $scope.sortOptions[0].value;
    }
}(this.angular));
(function (angular) {
    angular.module('app').factory('tmCachedCustomers', ['tmCustomer',Factory]);
    function Factory(tmCustomer) {
        var customerList;
        return {

            query: function () {
                if (!customerList) {
                    customerList = tmCustomer.query();
                }
                return customerList;
            },

            refresh: function () {
                customerList = tmCustomer.query();
                return customerList;
            },

            remove: function (id) {

                var item = customerList.map(function (e) {
                    return e._id;
                }).indexOf(id);
                customerList.splice(item, 1);

                return customerList;
            },

            add: function (customer) {
                customerList.push(customer);
                return customerList;
            },

            clear: function () {
                customerList = undefined;
            }
        };
    }
}(this.angular));

(function (angular) {
    angular.module('app').factory('tmCustomer', ['$resource', Factory]);

    function Factory($resource) {
        var CustomerResource = $resource('/api/customers/:_id', { _id: "@id" },
        {
            update: { method: 'PUT', isArray: false }
            //,query: {method: 'GET', isArray: false}
        });
        return CustomerResource;

    }
}(this.angular));

(function (angular) {
    angular.module('app').controller('tmCustomerProfileCtrl', ['$scope', '$location', 'tmDataCache', 'tmCachedCustomers', 'tmCustomer', 'tmNotifier', '$routeParams', '$stateParams', Controller]);
    function Controller($scope, $location, tmDataCache, tmCachedCustomers, tmCustomer, tmNotifier, $routeParams, $stateParams) {
        var customersCache;
        function init() {
            customersCache = tmDataCache.load('Customers');

            if ($stateParams.id === "new") {
                $scope.customer = {};
            } else {
                customersCache.query().forEach(function (customer) {
                    if (customer._id === $stateParams.id) {
                        $scope.customer = customer;
                    }
                });
                if (typeof $scope.customer === 'undefined') {
                    $state.go('/events/customers');
                }
            }
        }

        init();
        // fired when invoked
        //tmCachedCustomers.query().$promise.then(function (collection) {
        //    //console.log("i am here");
        //    if ($stateParams.id === "new") {
        //        $scope.customer = {};
        //    }
        //    else {
        //        collection.forEach(function (customer) {
        //            if (customer._id === $stateParams.id) {
        //                $scope.customer = customer;
        //            }
        //        });
        //        if (typeof $scope.customer === 'undefined') { $location.path('/events/customers'); }
        //    }


        //});

        $scope.submitCustomer = function () {
            if ($stateParams.id === "new") {
                createCustomer();
            } else {
                updateCustomer();
            }
        };

        function updateCustomer() {

            customersCache.update($scope.customer).then(
                function () {
                    tmNotifier.notify("The customer record has been updated.");
                    $location.path('/events/customers');
                }, function (reason) {
                    tmNotifier.error(reason);
                }
                );
            //tmCustomer.update({ _id: $scope.customer._id }, $scope.customer).$promise.then(function () {
            //    tmNotifier.notify("The customer record has been updated.");
            //    $location.path('/events/customers');
            //}, function (reason) {
            //    tmNotifier.error(reason);
            //});


        }

        function createCustomer() {
            //var CustomerData = tmDataCache.load('Customers');
            var newCustomerData = {
                name: { firstName: $scope.customer.firstName, lastName: $scope.customer.lastName },
                firstName: $scope.customer.firstName,
                lastName: $scope.customer.lastName

            };
            customersCache.add(newCustomerData).then(
                function () {
                    tmNotifier.notify("The customer record has been added.");
                    $location.path('/events/customers');
                },
                function (reason) {
                    tmNotifier.error(reason);
                }
                );
            //console.log(newCustomerData);
            //var newCustomer = new tmDataCache.load('Customers').Resource(newCustomerData);
            //var newCustomer = new tmCustomer(newCustomerData);
            //newCustomer.$save().then(function (item) {

            //    tmNotifier.notify("The customer record has been added.");
            //    tmCachedCustomers.add(item);
            //    $location.path('/events/customers');
            //}, function (reason) {
            //    tmNotifier.error(reason);
            //});


        }
    }
}(this.angular));

(function (angular) {
    angular.module('app').controller('tmCustomersCtrl', ['$scope', 'tmCachedCustomers', 'tmDataCache', 'tmCustomer', 'tmNotifier', '$q', '$location', Controller]);

    function Controller($scope, tmCachedCustomers, tmDataCache, tmCustomer, tmNotifier, $q, $location) {
        $scope.pageTitle = "Events > Customers";
        var customersCache;
        function init() {
            customersCache = tmDataCache.load('Customers');

            $scope.customers = customersCache.query();

        }

        init();


        $scope.sortOptions = [{ value: "lastName", text: "Sort by Last Name" }, { value: "firstName", text: "Sort by First Name" }];

        $scope.sortOrder = $scope.sortOptions[0].value;

        $scope.deleteCustomer = function (id) {

            //tmCustomer.remove({ _id: id });
            customersCache.Resource.remove({ _id: id });
            tmNotifier.notify("The customer record has been removed.");
            $scope.customers = customersCache.remove(id);


        };


        //$scope.$on('loggedOut', function () { tmCachedCustomers.clear(); });

        //$scope.addCustomer = function () {
        //    var newCustomerData = {
        //        //collect form fields here
        //    };

        //    var newCustomer = new tmCustomer(newCustomerData);
        //    var dfd = $q.defer();
        //    newCustomer.$save().then(function () {
        //        dfd.resolve();
        //    }, function (response) {
        //        dfd.reject(response.data.reason);
        //    });
        //    return dfd.promise;


        //};


    }
}(this.angular));

(function (angular) {
    angular.module('app').controller('tmDevNotesCtrl', ['$scope', Controller]);
    function Controller($scope) {
        $scope.pageTitle = "Dev > Notes";
        $scope.DevNotes = [
            { "date": "140324", "text": "Setting up new dev project with the pluralsight project by Joe Eames on the mean stack." },
            { "date": "140324", "text": "Created new directory...npm installed --save express jade" },
            { "date": "140324", "text": "[git init] to kick of git for source control" },
            { "date": "140324", "text": "created a new .gitignore file in webstorm [git status] to see what files are tracked" },
            { "date": "140324", "text": "added .idea and node_modules to the gitignore file to keep them out of source control" },
            { "date": "140324", "text": "[git status] again and the files have been removed from gits purview" },
            { "date": "140324", "text": "[git add -A] to add to staging and [git commit -m 'initial commit']" },
            { "date": "140324", "text": "[git remote add origin https://github.com/patterncoder/tipminer.git] to add the github repo I created on the site" },
            { "date": "140324", "text": "[git push -u origin master] entered the username and password" },
            { "date": "140324", "text": "install client side dependencies with bower I chose to install globally could have installed as just scoped to project would have been [npm install bower --save-dev]" },
            { "date": "140324", "text": "[npm install bower -g] executed successfully geez..lot of stuff with bower" },
            { "date": "140324", "text": "now need to setup folder structure added two top level folder server(node files and views, partials etc this is because partials will be processed with jade) and public(css, angular etc)" },
            { "date": "140324", "text": "added a bowerrc file to tell where to place client side dependencies" },
            { "date": "140324", "text": "[bower init]...answered several questions no to all except yes to private..also set to node module type(not sure if this was correct)" },
            { "date": "140324", "text": "[bower install jquery --save]...[bower install toastr --save]...[bower install angular angular-route angular-resource --save]" },
            { "date": "140324", "text": "the above commands added a dependency node to the bower.json file also because of the .bowerrc file it added the installed files in the public/vendor folder...pretty clean so far" },
            { "date": "140324", "text": "added server.js file...and started coding according to the \'creating the node application \' module in the pluralsight video.  this is where watchers were discussed for webstorm." },
            { "date": "140324", "text": "added server/views folder and an index.jade file" },
            { "date": "140324", "text": "started up server succesfully but could not browse to it...fixed it..had doctype html and is should just be doctype at the top of the jade file" },
            { "date": "140324", "text": "[npm install nodemon -g] for the ability make changes without stopping node each time  " },
            { "date": "140324", "text": "added some more code to server.js and [npm install stylus --save]" },
            { "date": "140324", "text": "everything is working at this point." },
            { "date": "140324", "text": "committed changes to this point...pushed to github...deployed to azure...didn't work...think it has to do with ports" },
            { "date": "140324", "text": "added an server/includes folder and a layout.jade file in the folder...added a public/css folder" },
            { "date": "140324", "text": "bower installed bootstrap for project then copied the bootstrap.css file to the public/css folder" },
            { "date": "140324", "text": "npm intalled globally the stylus module so that the stylus file watcher would work" },
            { "date": "140324", "text": "modified the index.jade and created layout.jade and scripts.jade this packaged up the scripts and process the site.styl file" },
            { "date": "140324", "text": "fixed azure after modifying how the port was set and now it runs correctly" },
            { "date": "140324", "text": "added public/app folder and added app.js file and started the angular aspect of the app" },
            { "date": "140324", "text": "going to setup angular partials to use jade...added a /server/views/partials folder and added a main.jade file called from the mainCtrl" },
            { "date": "140324", "text": "added ng-view and ng-app directives to index.jade and layout.jade respectively" },
            { "date": "140324", "text": "getting ready to add mongo...npm install mongoose --save" },
            { "date": "140324", "text": "added code according to the video and got it working!" },
            { "date": "140324", "text": "next part is the heroku deployment which includes adding a mongolab db" },
            { "date": "140324", "text": "made a Procfile that heroku reads to tell it to launch node, also modified the package.json to have an engines key that has the node and npm versions specified" },
            { "date": "140324", "text": "okay..messed around for a while.  got the github repo deploying to azure and heroku.  to get to heroku it goes through codeship" },
            { "date": "140324", "text": "played around with environment variables...NODE_ENV=production was set in the config screen on azure and through the heroku cli for heroku.  the heroku deployment varies from the video a little bit because of the dual deployment" },
            { "date": "140407", "text": "Starting back up today...trying to figure out where I left off...reviewed that I started implementing some bootstrap on the partials that angular calls for in the main.jade" },
            { "date": "140407", "text": "Looks like next we are going to mock up some sample data...just did a git status to see what's up there...currently up to date..just learned cd .. moves you up one directory in the command line" },
            { "date": "140407", "text": "did some reorganization...move main controller controller to a new folder app/main" },
            { "date": "140407", "text": "put sample data objects in the main controller and then linked to them in the two partials via ng-repeat" },
            { "date": "140407", "text": "Created partial for login...added ng-include to the main.jade" },
            { "date": "140407", "text": "refactored some more and moved files around...changed the partials route in server.js to an asterisk and moved files to ../../public/app/ + req.params" },
            { "date": "140407", "text": "did some more refactoring to move code out into their own files and used a lot of require() statements...liking where this is going and was doing some of the refactoring before the video explained it...i did watch it like five times while on the bike." },
            { "date": "140414", "text": "picking up on the preparing for login module on the pluralsight video.  npm install passport passport-local --save" },
            { "date": "140414", "text": "in mongoose.js created a userSchema mongoose.Schema, created a User var to create a mongoose model based on the mongoose schema" },
            { "date": "140414", "text": "learned that mongoose schema calls utils.toCollectionName to take the schema name and pluraize it to name the collection.  override this by new Schema({...},{collection:'putNameHere'}) tried it and it works" },
            { "date": "140414", "text": "finished the server and client code to implement a naive login...used passport...touched the server.js, routes.js, tmNavBarLoginCtrl and express.js files...deployed to github and thus heroku and azure..working on both sites!" },
            { "date": "140414", "text": "Moving on to improving the client login code video...started by implementing toastr notification..created new folder app/common...wrapped toastr in angular service" },
            { "date": "140414", "text": "Following video still...refactoring..created app/account/tmAuth.js...this is where Q is introduced for promises...moved the http call to authentication to its own module" },
            { "date": "140414", "text": "Moving on to next video improving the server login code....refactoring login route and moved logic to its own file...remember exports.[functionName] can modularize just a function" },
            { "date": "140414", "text": "Learning how to encrypt passwords. One way encryption..aka hashing...password + unique salt => hashing algorithm = hashed password" },
            { "date": "140414", "text": "the salt stuff wasn't too bad once i typed 'er in.  ***Remember to remove the password and salt from the schema when passing up to the client" },
            { "date": "140414", "text": "video Adding Signout Functionality...added signout feature in the navbar-login.jade file" },
            { "date": "140414", "text": "created the signout() function on the login controller...and created a route on the server to handle the logout" },
            { "date": "140414", "text": "persisting login between page refreshes video...stuck the current user into the currentuser.jade file and linked it to angular in the identity module with the $window angular service" },
            { "date": "140414", "text": "refactored server.js by putting all of the passport code in passport.js" },
            { "date": "140417", "text": "video:implementing clientside authorization...used angular resource added admin menu item when logged in as admin" },
            { "date": "140417", "text": "video:implementing serverside authroization...don't remember much about what I did here...its been 4 days...most of it was in the routes.js file where we used middleware to protect the resource" },
            { "date": "140421", "text": "learned that req.user is set in the local strategy when we go to mongoose to get the user" },
            { "date": "140421", "text": "video: installing testing tools...npm install --save-dev karma mocha karma-mocha karma-chai-plugins...bower install --save angular-mocks#1.2.0  or leave #1.2.0 off to get latest version...needed to npm install karma-cli -g because it didn't come down in the initial install...thank god for stack overflow!" },
            { "date": "140421", "text": "karma init...[tab] to select mocha...no to require.js...chrome for browser...public/app/**/*.js for location of files...test/tests/**/*.js for test files location...ignore warning of no file match...public/app/app.js for file exclusion...yes on karma to watch" },
            { "date": "140421", "text": "karma created config file at karma.conf.js in root...modified file...added frameworks 'chai', 'sinon-chai'....added to list of files 'public/vendor/angular/angular.js', 'public/vendor/angular-resource/angular-resource.js', public/vendor/angular-mocks/angular-mocks.js'" },
            { "date": "140421", "text": "creating new test directory and added test-app.js file added some setup code to kick off angular and mock toastr" },
            { "date": "140421", "text": "video: implmenting the client code for signup....added link to sign up in nav bar header" },
            { "date": "140605", "text": "Picking back up the dev baton...been a while since I have worked on this...want to start moving to a more stable dev environment where mock data and real data can coexist." },
            { "date": "140605", "text": "Also need to start working on bringing over real data from the website.  Probably should implement some sort of polling scenario so that when the time comes we can just turn off the polling code and the website will be up to date." },
            { "date": "140605", "text": "Also where should I store dev notes?" },
            { "date": "140605", "text": "How do I implement feature authorization...cursory look shows that claims based is solely a microsoft thing...that leaves us with just roles." },
            { "date": "140605", "text": "Does each feature correspond to a role?....ok spent some time on this.  refactored the express route intercept logic and made it so that each feature/activity can have roles assigned to it." },
            { "date": "140605", "text": "Also started digging into moving data to MongoLab so that I have data to test against...looking at making an azure worker role that will keep the data in synch...I need to craft it so that it is true sync code rather than move a bunch of data then synch." },
            { "date": "140628", "text": "abandoning the moving of existing data.  too much work right now" },
            { "date": "140628", "text": "Couple of things we need to figure out...dynamic menus for navigation...how to mimic the qbo login page...is our authentication strategy acceptable...how does https get implemented" },
            { "date": "140714", "text": "dynamic menus is working...qbo login page is up in the air...authentication is looking pretty accepatable and can grow with passport...https is doable with express, just need to have listening done on two ports one for each protocol...have added angular-ui bootstrap to power the accordians for navigation, liking this strategy...have also pulled in lodash on the server for deep cloning" },
            { "date": "140714", "text": "need to start thinking about the workflow of adding a new company and how to isolate that data.  Then users need to be added for the company" },
            { "date": "140714", "text": "Create Company(ensure uniqueness)...Setup visiblity of workflow milestones to create a community and gameification...Create company admin and give proper roles...create company users and give proper roles." },
            { "date": "140919", "text": "Hit the reset...been playing around for a while and have got a pretty good working mobil menu system.  Would like to figure out how to collapse the menu after a selection.  Also want to solve breadcrumbs based on some sort of page definition" },
            { "date": "140928", "text": "went back to regular api.  the hypermedia api wasn't getting me any extra value as far as i could tell at this point.  the links didn't drive the ui as much as i thought they would because the json api is hidden from the ui.  for now i will skip this.  Next steps...breadcrumbs...flesh out the signup and login procedure...payments" },
            { "date": "150202", "text": "Ok...I have been covering a lot of ground...Moved to uiRouter...using gulp to lint and minify...setup a rudimentary data context" },
            { "date": "150202", "text": "" },
            { "date": "150202", "text": "" },
            { "date": "150202", "text": "" },
            { "date": "150202", "text": "" },
            { "date": "150202", "text": "" }





        ];

    }
}(this.angular));

(function (angular) {
    angular.module('app').controller('tmMainCtrl', ['$scope', 'tmCachedContracts', Controller]);
    function Controller($scope, tmCachedContracts) {
        $scope.restaurantName = "Baily's";

        $scope.contracts = [];

        $scope.$on('loggedOut', function () { $scope.contracts = tmCachedContracts.clear(); });
        $scope.$on('loggedIn', function () { $scope.refreshList(); });
        //$scope.contracts = tmCachedContracts.query();
        $scope.refreshList = function () {
            $scope.contracts = tmCachedContracts.query();
        };
        function init() {
            $scope.refreshList();
        }

        init();
    }
}(this.angular));

(function (angular) {

    angular.module('app').factory('tmMenuItem', ['$resource', Factory]);
    function Factory ($resource) {

        var MenuItemResource = $resource('api/menuitems/:id', { _id: "@id" }, {
            update: { method: 'PUT', isArray: false }
        });

        return MenuItemResource;

    }

}(this.angular));
(function (angular) {

    'use strict';
    angular.module('app').controller('tmMenuItemDetailCtrl', ['tmDataCache', 'tmNotifier', '$stateParams', '$state', Controller]);


    function Controller(tmDataCache, tmNotifier, $stateParams, $state) {

        var vm = this;
        var menuItemsCache;

        function init() {

            menuItemsCache = tmDataCache.load('MenuItems');
            if ($stateParams.id === "new") {
                vm.menuItem = {};
            } else {
                vm.menuItem = menuItemsCache.getOne($stateParams.id);
                console.log(vm.menuItem);
            }
            
        }

        init();

        vm.pageTitle = "Production > Menu Items";
        vm.submitMenuItem = function () {
            if ($stateParams.id === "new") {
                createMenuItem();
            } else {
                updateMenuItem();
            }
        };

        function createMenuItem() {
            var newMenuItem = {
                name: vm.name,
                description: vm.description,
                category: vm.category
            };
            menuItemsCache.add(newMenuItem).then(
                function () {
                    tmNotifier.notify("The menu item record has been added.");
                    $state.go('/production/menuItems');
                },
                function (reason) {
                    tmNotifier.error(reason);
                }
                );
        }

        function updateMenuItem() {
            menuItemsCache.update(vm.menuItem).then(
                function () {
                    tmNotifier.notify("The menu item record has been updated");
                    $state.go('/production/menuItems');
                },
                function (reason) {
                    tmNotifier.error(reason);
                }
                );
        }

    }



}(this.angular));
(function (angular) {

    'use strict';
    angular.module('app').controller('tmMenuItemsCtrl', ['tmDataCache', 'tmNotifier', Controller]);


    function Controller(tmDataCache, tmNotifier) {

        var vm = this;
        var menuItemsCache;

        function init() {
            menuItemsCache = tmDataCache.load('MenuItems');
            console.log('in init in menuitemsctrl');
            vm.menuItems = menuItemsCache.query();
        }

        init();

        vm.pageTitle = "Production > Menu Items";
    }



}(this.angular));
   

(function () {
    angular.module('app').controller('tmNavigationCtrl', ['$scope', '$http', '$window', 'tmLoginMessageService', 'tmIdentity', Controller]);
    function Controller($scope, $http, $window, tmLoginMessageService, tmIdentity) {
        //$scope, $http, $window, tmLoginMessageService, tmIdentity
            //this is a hack here to keep menu on page with a page refresh...just like the login widgit
            if ($window.bootstrappedUserObject) {
                $http.get('/api/navigation').success(function (data) {
                    $scope.navItems = data;
                });

            }



            $scope.identity = tmIdentity;

            $scope.$on('loggedIn', function () {

                $http.get('/api/navigation').success(function (data) {
                    $scope.navItems = data;
                });
            });

            $scope.$on('loggedOut', function () {

                $scope.navItems = [];
            });
    }
}(this.angular));
