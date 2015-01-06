

angular.module('app').controller('tmSignupCtrl', function ($scope, tmUser, tmNotifier, $location, tmAuth, tmLoginMessageService) {

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
        })
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

});



angular.module('app').directive('equals', function () {

    return {

        restrict: 'A', // only activate on element attribute
        require: '?ngModel', // get a hold of NgModelController
        link: function (scope, elem, attrs, ngModel) {
            if (!ngModel) return; // do nothing if no ng-model

            // watch own value and re-validate on change
            scope.$watch(attrs.ngModel, function () {
                validate();
            });

            // observe the other value and re-validate on change
            attrs.$observe('equals', function (val) {
                validate();
            });

            var validate = function () {
                // values
                var val1 = ngModel.$viewValue;
                var val2 = attrs.equals;

                // set validity
                ngModel.$setValidity('equals', !val1 || !val2 || val1 === val2);
            };
        }
    }

});