angular.module('app', ['ngResource', 'ngRoute', 'ngCookies', 'ui.router','ui.bootstrap']);

angular.module('app').config(function($stateProvider, $urlRouterProvider, $routeProvider, $locationProvider, $httpProvider)
{
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

    $urlRouterProvider.otherwise('/');

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
            controller: 'tmContractsCtrl'
        })
        .state('bids', {
            url: '/bids',
            templateUrl: '/partials/bids/bids-list',
            controller: 'tmBidsCtrl'
        })
        .state('customers', {
            url: '/events/customers',
            templateUrl: '/partials/customers/customers-list',
            controller: 'tmCustomersCtrl'
        })
        .state('customerProfile', {
            url: '/events/customers/:id',
            templateUrl: '/partials/customers/customer-profile',
            controller: 'tmCustomerProfileCtrl'
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
            controller: 'tmContractDetailsCtrl'
        });


    $httpProvider.defaults.cache = false;
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }
    // disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
    //.....here proceed with your routes


    

    

    $locationProvider.html5Mode(true);

    $routeProvider
        //.when('/', {
        //    templateUrl: '/partials/main/main',
        //    controller: 'tmMainCtrl'
        //})
        //.when('/signup', {
        //    templateUrl: '/partials/account/signup',
        //    controller: 'tmSignupCtrl'
        //})
        //.when('/login', {
        //    templateUrl: '/partials/account/login',
        //    controller: 'tmNavBarLoginCtrl'
        //})
        //.when('/profile', {
        //    templateUrl: '/partials/account/profile',
        //    controller: 'tmProfileCtrl',
        //    resolve: routeRoleChecks.user
        //})
        //.when('/events/contracts', {
        //    templateUrl: '/partials/contracts/contracts-list',
        //    controller: 'tmContractsCtrl'})
        //.when('/bids', {
        //    templateUrl: '/partials/bids/bids-list',
        //    controller: 'tmBidsCtrl'
        //})
        //.when('/events/customers', {
        //    templateUrl: '/partials/customers/customers-list',
        //    controller: 'tmCustomersCtrl'
        //})
        //.when('/events/customers/:id', {
        //    templateUrl: '/partials/customers/customer-profile',
        //    controller: 'tmCustomerProfileCtrl'
        //})
        //.when('/admin/users', {
        //    templateUrl: '/partials/admin/user-list',
        //    controller: 'tmUserListCtrl',
        //    resolve: routeRoleChecks.admin
        //})
        //.when('/dev/notes', {
        //    templateUrl: '/partials/dev/notes-list',
        //    controller: 'tmDevNotesCtrl',
        //    resolve: routeRoleChecks.admin
        //})
        //.when('/events/contracts/:id', {
        //    templateUrl: '/partials/contracts/contract-details',
        //    controller: 'tmContractDetailsCtrl'
        //});

});

angular.module('app').run(function ($rootScope, $location, $cookieStore) {

    $rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {

        if (rejection === 'not authorized') {
            $location.path('/');
        }
    });


});

$(document).on('click', '.navbar-collapse.in', function (e) { if ($(e.target).is('a')) { $(this).collapse('hide'); } });

