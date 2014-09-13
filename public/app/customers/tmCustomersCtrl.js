﻿angular.module('app').controller('tmCustomersCtrl', function ($scope, tmCachedCustomers, tmCustomer, tmNotifier, $q,$location) {
    $scope.pageTitle = "Events > Customers";
    $scope.customers = tmCachedCustomers.query();
    $scope.sortOptions = [{ value: "lastName", text: "Sort by Last Name" }, { value: "firstName", text: "Sort by First Name" }];
    $scope.sortOrder = $scope.sortOptions[0].value;

    $scope.addCustomer = function () {
        var newCustomerData = {
            //collect form fields here
        };

        var newCustomer = new tmCustomer(newCustomerData);
        var dfd = $q.defer();
        newCustomer.$save().then(function () {
            dfd.resolve();
        }, function (response) {
            dfd.reject(response.data.reason);
        });
        return dfd.promise;
        

    }
});