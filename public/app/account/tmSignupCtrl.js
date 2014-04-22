angular.module('app').controller('tmSignupCtrl', function($scope, tmUser, tmNotifier, $location, tmAuth){

    $scope.signup = function (){
        var newUserData = {
            username: $scope.email,
            password: $scope.password,
            firstName: $scope.fname,
            lastName: $scope.lname
        };

        tmAuth.createUser(newUserData).then(function(){
            tmNotifier.notify('User account created');
            $location.path('/');
        }, function(reason){
            tmNotifier.error(reason);
        });
    }

})