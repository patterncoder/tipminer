angular.module('app').controller('tmUserListCtrl', function($scope, tmUser){
    $scope.users = tmUser.query();
})