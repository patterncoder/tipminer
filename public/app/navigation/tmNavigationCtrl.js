
(function () {
    angular.module('app').controller('tmNavigationCtrl', ['$scope', '$http', '$window', 'tmLoginMessageService', 'tmIdentity', Controller]);
    function Controller($scope, $http, $window, tmLoginMessageService, tmIdentity) {
        //$scope, $http, $window, tmLoginMessageService, tmIdentity
            //this is a hack here to keep menu on page with a page refresh...just like the login widgit
            if ($window.bootstrappedUserObject) {
                $http.get('/api/navigation').success(function (data) {
                    $scope.navItems = data;
                });

            }



            $scope.identity = tmIdentity;

            $scope.$on('loggedIn', function () {

                $http.get('/api/navigation').success(function (data) {
                    $scope.navItems = data;
                });
            });

            $scope.$on('loggedOut', function () {

                $scope.navItems = [];
            });
    }
}(this.angular));
