(function (angular) {
    angular.module('app').controller('tmSignupCtrl', ['$scope', 'tmUser', 'tmNotifier', '$location', 'tmAuth', 'tmLoginMessageService', Controller]);
    function Controller($scope, tmUser, tmNotifier, $location, tmAuth, tmLoginMessageService) {
        $scope.createAccount = function () {
            var newAccountData = {
                companyName: $scope.company,
                username: $scope.email,
                password: $scope.password,
                firstName: $scope.fname,
                lastName: $scope.lname,
                roles: ["admin"]
            };

            tmAuth.createAccount(newAccountData).then(function () {

                tmLoginMessageService.broadcastLogin();

                tmNotifier.notify('Company account created');
                $location.path('/');
            }, function (reason) {
                tmNotifier.error(reason);
            });
        };

        $scope.signup = function () {
        
            var newUserData = {
                companyName: $scope.company,
                username: $scope.email,
                password: $scope.password,
                firstName: $scope.fname,
                lastName: $scope.lname
            };

            tmAuth.createUser(newUserData).then(function () {
                tmNotifier.notify('User account created');
                $location.path('/');
            }, function (reason) {
                tmNotifier.error(reason);
            });
        
        };

    }



    
}(this.angular));

