angular.module('app', ['ngResource', 'ngRoute', 'ngCookies', 'ui.bootstrap']);

angular.module('app').config(function($routeProvider, $locationProvider, $httpProvider)
{
    $httpProvider.defaults.cache = false;
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }
    // disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
    //.....here proceed with your routes


    var routeRoleChecks = {
        admin: {
            auth: function(tmAuth){
                return tmAuth.authorizeCurrentUserForRoute('admin');
            }
        },
        user: {
            auth: function(tmAuth){
                return tmAuth.authorizeAuthenticatedUserForRoute();
            }
        }
    }

    

    $locationProvider.html5Mode(true);

    $routeProvider
        .when('/', {
            templateUrl: '/partials/main/main',
            controller: 'tmMainCtrl'
        })
        .when('/signup', {
            templateUrl: '/partials/account/signup',
            controller: 'tmSignupCtrl'
        })
        .when('/login', {
            templateUrl: '/partials/account/login',
            controller: 'tmNavBarLoginCtrl'
        })
        .when('/profile', {
            templateUrl: '/partials/account/profile',
            controller: 'tmProfileCtrl',
            resolve: routeRoleChecks.user
        })
        .when('/events/contracts', {
            templateUrl: '/partials/contracts/contracts-list',
            controller: 'tmContractsCtrl'})
        .when('/bids', {
            templateUrl: '/partials/bids/bids-list',
            controller: 'tmBidsCtrl'
        })
        .when('/events/customers', {
            templateUrl: '/partials/customers/customers-list',
            controller: 'tmCustomersCtrl'
        })
        .when('/events/customers/:id', {
            templateUrl: '/partials/customers/customer-profile',
            controller: 'tmCustomerProfileCtrl'
        })
        .when('/admin/users', {
            templateUrl: '/partials/admin/user-list',
            controller: 'tmUserListCtrl',
            resolve: routeRoleChecks.admin
        })
        .when('/dev/notes', {
            templateUrl: '/partials/dev/notes-list',
            controller: 'tmDevNotesCtrl',
            resolve: routeRoleChecks.admin
        })
        .when('/events/contracts/:id', {
            templateUrl: '/partials/contracts/contract-details',
            controller: 'tmContractDetailsCtrl'
        });

});

angular.module('app').run(function($rootScope, $location, $cookieStore){

    $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection){

            if(rejection === 'not authorized'){
                $location.path('/');
            }
    })

    //console.log($cookieStore.get("session.id"));
    // check if there is already a session?
    //var sessionId = window.localStorage["session.id"];
    //if (sessionId == null) {
    //    sessionId = $cookieStore.get("session.id");
    //}

    //if (sessionId != null) {
    //    $http.get("/sessions/" + sessionId)
    //        .success(function (data) {
    //            $http.defaults.headers.common['X-Session-ID'] = data.id;
    //            $cookieStore.put("session.id", data.id);

    //            $rootScope.user = data.user;
    //        })
    //        .error(function () {
    //            // remove the cookie, since it's dead
    //            $cookieStore.remove("session.id");
    //            window.localStorage.removeItem("session.id");
    //            $location.path("/login");
    //        });
    //} else {
    //    if ($location.path() != "/login" && $location.path() != "/signup") {
    //        $location.path("/login");
    //    }
    //}

})

$(document).on('click', '.navbar-collapse.in', function (e) { if ($(e.target).is('a')) { $(this).collapse('hide'); } });

