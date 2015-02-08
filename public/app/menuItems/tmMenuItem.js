(function (angular) {

    angular.module('app').factory('tmMenuItem', ['$resource', Factory]);
    function Factory ($resource) {

        var MenuItemResource = $resource('/api/menuitems/:_id', { _id: "@id" }, {
            update: { method: 'PUT', isArray: false }
        });

        return MenuItemResource;

    }

}(this.angular));