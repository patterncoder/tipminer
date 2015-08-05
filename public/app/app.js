(function (angular) {
    var app = angular.module('app', ['ngResource', 'ngRoute', 'ngCookies', 'ui.router', 'ui.bootstrap']);

    app.run(['appStart', function (appStart) {
        appStart.start();
    }]);

    angular.module('app').run(function ($rootScope, $state, $cookieStore, $stateParams, tmDataCache) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams, error){
            $rootScope.previousState_name = fromState.name;
            $rootScope.previousState_params = fromParams;
        });
        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {

            if (error === 'not authorized') {
                console.log('not authorized for route');
                $state.go('home');
            }
        });
        $rootScope.back = function(){
            if($rootScope.previousState_name === '') $rootScope.previousState_name = 'home';
            
            $state.go($rootScope.previousState_name, $rootScope.previousState_params);
        };
        
        

        $rootScope.$on('loggedOut', function () {
            tmDataCache.clearCache();

        });


    });

}(this.angular));







