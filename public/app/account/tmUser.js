angular.module('app').factory('tmUser', function ($resource) {

    var UserResource = $resource('/api/users/:id', { _id: "@id" }, {
        update: { method: 'PUT', isArray: false }
    });

    //Test: returns true if has role of admin otherwise false
    UserResource.prototype.isAdmin = function () {
        return this.roles && this.roles.indexOf("admin") > -1;
    };

    return UserResource;

});