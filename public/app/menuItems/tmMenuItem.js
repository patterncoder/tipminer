(function (angular) {

    angular.module('app').factory('tmMenuItem', function ($resource) {

        var MenuItemResource = $resource('api/menuitems/:id', { _id: "@id" }, { update: {method: 'PUT', isArray: false}
        });

        return MenuItemResource;

    })

})(this.angular)