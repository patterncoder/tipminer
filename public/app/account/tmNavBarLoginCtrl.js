angular.module('app').controller('tmNavBarLoginCtrl', function($scope, $http){

    $scope.signin = function(username, password){

        //console.log("not finished yet");
        $http.post('/login', {username:username, password:password}).then(function(response){
            if(response.data.success){
                console.log("Logged in!");
            } else
            {
                console.log("failed to log in");
            }
        });

    }



});