(function (angular) {

    angular.module('app').factory('tmMenuGroup', ['$resource', Factory]);
    function Factory ($resource) {

        var MenuItemResource = $resource('/api/menugroups/:_id', { _id: "@id" }, {
            update: { method: 'PUT', isArray: false }
        });

        return MenuItemResource;

    }

}(this.angular));