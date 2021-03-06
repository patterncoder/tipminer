(function (angular) {
    angular.module('app').controller('tmNavBarLoginCtrl', ['$scope', '$http', '$remember', 'tmNotifier', 'util', 'tmIdentity', 'tmLoginMessageService', 'tmAuth', '$location', Controller]);
    function Controller($scope,$http,$remember,tmNotifier,util,tmIdentity,tmLoginMessageService,tmAuth,$location) {
        $scope.remember = false;

        if ($remember('username') && $remember('password')) {
            $scope.remember = true;
            $scope.username = $remember('username');
            $scope.password = $remember('password');

        }

        $scope.rememberMe = function (username, password, remember) {
            if (remember) {

                $remember('username', { value: username, expires: 10 });
                $remember('password', { value: password, expires: 10 });

                //$remember('username', username);
                //$remember('password', $scope.password);

            } else {
                $remember('username', '');
                $remember('password', '');
            }
        };

        $scope.identity = tmIdentity;

        $scope.signin = function (username, password, remember) {
            $scope.rememberMe(username, password, remember);
            tmAuth.authenticateUser(username, password).then(function (success) {
                if (success) {
                    util.logger.notify("You have successfully signed in!");
                    tmLoginMessageService.broadcastLogin();
                    $location.path('/');
                } else {

                    util.logger.notify("Username/password combination is incorrect.");
                }

            });

        };

        $scope.loginClick = function () { $location.path('/login'); };

        $scope.signout = function () {

            tmAuth.logoutUser().then(function () {
                $scope.username = "";
                $scope.password = "";
                util.logger.notify("You have successfully signed out!");
                tmLoginMessageService.broadcastLogout();
                $location.path('/');
            });
        };

    }
}(this.angular));
