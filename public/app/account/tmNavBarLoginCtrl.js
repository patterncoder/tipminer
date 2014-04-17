angular.module('app').controller('tmNavBarLoginCtrl', function($scope, $http, tmNotifier, tmIdentity, tmAuth, $location){

    $scope.identity = tmIdentity;
    $scope.signin = function(username, password){
        tmAuth.authenticateUser(username, password).then(function(success){
            if(success){
                tmNotifier.notify("You have successfully signed in!");
            } else  {

                tmNotifier.notify("Username/password combination is incorrect.");
            }

        })
        //console.log("not finished yet");


    }

    $scope.signout = function(){

        tmAuth.logoutUser().then(function(){
            $scope.username = "";
            $scope.password = "";
            tmNotifier.notify("You have successfully signed out!");
            $location.path('/');
        })
    }



});