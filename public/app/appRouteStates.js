(function (angular) {
    angular.module('app').config(function ($stateProvider, $urlRouterProvider, $routeProvider, $locationProvider, $httpProvider) {
        var routeRoleChecks = {
            admin: {
                auth: function (tmAuth) {
                    return tmAuth.authorizeCurrentUserForRoute('admin');;
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
                controller: 'tmMenuItemsCtrl',
                resolve: routeRoleChecks.user
            });


        $httpProvider.defaults.cache = false;
        if (!$httpProvider.defaults.headers.get) {
            $httpProvider.defaults.headers.get = {};
        }

        // disable IE ajax request caching
        $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';


        $locationProvider.html5Mode(true);



    });
})(this.angular)