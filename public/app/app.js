(function (angular) {
    var app = angular.module('app', ['ngResource', 'ngRoute', 'ngCookies', 'ui.router', 'ui.bootstrap']);

    app.run(['appStart', function (appStart) {
        appStart.start();
    }]);

    angular.module('app').run(function ($rootScope, $state, $cookieStore) {

        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {

            if (error === 'not authorized') {
                console.log('not authorized for route');
                $state.go('home');
            }
        });


    });

})(this.angular)







