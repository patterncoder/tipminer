angular.module('app').controller('tmProfileCtrl', function($scope, tmAuth, tmIdentity, tmNotifier){

    $scope.email = tmIdentity.currentUser.username;
    $scope.fname = tmIdentity.currentUser.firstName;
    $scope.lname = tmIdentity.currentUser.lastName;

    $scope.update = function(){
        var newUserData = {
            username: $scope.email,
            firstName: $scope.fname,
            lastName: $scope.lname
        };

        if($scope.password && $scope.password.length > 0) {
            newUserData.password = $scope.password;
        }

        tmAuth.updateCurrentUser(newUserData).then(function(){
            tmNotifier.notify("Your user account has been updated");

        }, function(reason){
            tmNotifier.error(reason);
        })

    }


})