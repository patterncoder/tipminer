angular.module('app').controller('tmUserListCtrl', function ($scope, tmUser) {
    $scope.pageTitle = "Admin > Users";
    $scope.users = tmUser.query();
});