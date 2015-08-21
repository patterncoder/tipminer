(function (angular) {
    angular.module('app').config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', Config]);

    function Config ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        
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
        // view the config in the console:  console.table($('body').injector().get('$state').get())
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
            .state('bids', {
                url: '/bids',
                templateUrl: '/partials/bids/bids-list',
                controller: 'tmBidsCtrl',
                resolve: routeRoleChecks.user
            })
            .state('customers', {
                url: '/events/customers',
                templateUrl: '/partials/customers/customers-list',
                //controller: 'tmCustomersCtrl',
                resolve: routeRoleChecks.user
            })
            .state('customerProfile', {
                url: '/events/customers/:id',
                templateUrl: '/partials/customers/customer-profile',
                //controller: 'tmCustomerProfileCtrl',
                resolve: routeRoleChecks.user
            })
            .state('users', {
                url: '/admin/users',
                templateUrl: '/partials/admin/user-list',
                //controller: 'tmUserListCtrl',
                resolve: routeRoleChecks.admin
            })
            .state('devnotes', {
                url: '/dev/notes',
                templateUrl: '/partials/dev/notes-list',
                controller: 'tmDevNotesCtrl',
                resolve: routeRoleChecks.admin
            })
            .state('contracts', {
                url: '/events/contracts',
                templateUrl: '/partials/contracts/contracts-list',
                resolve: routeRoleChecks.user
            })
            .state('contractDetail', {
                url: '/events/contracts/:id',
                templateUrl: '/partials/contracts/contract-details',
                resolve: routeRoleChecks.user
            })
            .state('menuGroups', {
                url: '/production/menuGroups',
                templateUrl: '/partials/menuGroups/menuGroups-list',
                resolve: routeRoleChecks.user
            })
            .state('menuGroupDetail', {
                url: '/production/menuGroups/:id',
                resolve: routeRoleChecks.user,
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal){
                    $modal.open({
                        animation: true,
                        templateUrl: '/partials/menuGroups/menuGroup-detail',
                        controller: 'tmMenuGroupDetailCtrl as vm',
                        resolve: {itemId: function(){return $stateParams.id;}},
                        size: 'fs'
                    }).result.finally(function(){
                        $state.go('^');
                    });
                }]
            })
            .state('menuItems', {
                url: '/production/menuItems',
                templateUrl: '/partials/menuItems/menuItems-list',
                resolve: routeRoleChecks.user
            })
            .state('menuItemDetail', {
                url: '/production/menuItems/:id',
                templateUrl: '/partials/menuItems/menuItem-detail',
                resolve: routeRoleChecks.user
            })
            .state('menus', {
                url: '/production/menus',
                templateUrl: '/partials/menus/menus-list',
                
                resolve: routeRoleChecks.user
            })
            .state('menuDetail', {
                url: '/production/menus/:id',
                //templateUrl: '/partials/menus/menu-detail',
                
                resolve: routeRoleChecks.user,
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal){
                    $modal.open({
                        animation: true,
                        templateUrl: '/partials/menus/menu-detail',
                        controller: 'tmMenuDetailCtrl as vm',
                        resolve: {itemId: function(){return $stateParams.id;}},
                        size: 'fs'
                    }).result.finally(function(){
                        $state.go('^');
                    });
                }]
            });


        $httpProvider.defaults.cache = false;
        if (!$httpProvider.defaults.headers.get) {
            $httpProvider.defaults.headers.get = {};
        }

        // disable IE ajax request caching
        $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';

        //the line below is not required if using ui-router srefs
        $locationProvider.html5Mode(true);



    }

}(this.angular));