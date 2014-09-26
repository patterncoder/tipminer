angular.module('app').controller('tmNavBarLoginCtrl', function ($scope, $http, $remember, tmNotifier, tmIdentity, tmLoginMessageService, tmAuth, $location) {

    $scope.remember = false;

    if ($remember('username') && $remember('password')) {
        $scope.remember = true;
        $scope.username = $remember('username');
        $scope.password = $remember('password');
        
    }

    $scope.rememberMe = function (username, password, remember) {
        if (remember) {
            console.log('password is ' + password);
            console.log('username is ' + username);
            $remember('username', { value: username, expires: true });
            $remember('password', { value: password, expires: true });
            
            //$remember('username', username);
            //$remember('password', $scope.password);
            
        } else {
            $remember('username', '');
            $remember('password', '');
        }
    };

    $scope.identity = tmIdentity;
    $scope.signin = function(username, password, remember){
        $scope.rememberMe(username, password, remember);
        tmAuth.authenticateUser(username, password).then(function (success) {
            if(success){
                tmNotifier.notify("You have successfully signed in!");
                tmLoginMessageService.broadcastLogin();
                $location.path('/');
            } else  {

                tmNotifier.notify("Username/password combination is incorrect.");
            }

        })
      
    }

    $scope.signout = function(){

        tmAuth.logoutUser().then(function(){
            $scope.username = "";
            $scope.password = "";
            tmNotifier.notify("You have successfully signed out!");
            tmLoginMessageService.broadcastLogout();
            $location.path('/');
        })
    }



});