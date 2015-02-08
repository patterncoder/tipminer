(function (angular) {
    'use strict';
    angular.module('app').controller('tmUserListCtrl', ['$scope', 'tmUser', Controller]);
    function Controller($scope, tmUser) {
        $scope.pageTitle = "Admin > Users";
        $scope.users = tmUser.query();

    }
}(this.angular));
