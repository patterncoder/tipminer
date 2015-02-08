(function (angular) {
    angular.module('app').controller('tmProfileCtrl', ['$scope', 'tmAuth', 'tmIdentity', 'tmNotifier', Controller]);
    function Controller($scope, tmAuth, tmIdentity, tmNotifier) {
        $scope.pageTitle = "My Profile";
        $scope.email = tmIdentity.currentUser.username;
        $scope.fname = tmIdentity.currentUser.firstName;
        $scope.lname = tmIdentity.currentUser.lastName;

        $scope.update = function () {
            var newUserData = {
                username: $scope.email,
                firstName: $scope.fname,
                lastName: $scope.lname
            };

            if ($scope.password && $scope.password.length > 0) {
                newUserData.password = $scope.password;
            }

            tmAuth.updateCurrentUser(newUserData).then(function () {
                tmNotifier.notify("Your user account has been updated");

            }, function (reason) {
                tmNotifier.error(reason);
            });

        };
    }
}(this.angular));
