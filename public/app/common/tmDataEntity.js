﻿(function (angular) {

    angular.module('app').factory('tmDataEntity', function () {
        var List;
        function tmDataEntity(resource) {
            this.Resource = resource;
            
        }

        tmDataEntity.prototype = {
            query: function () {
                if (!this.List) {
                    this.List = this.Resource.query()
                }
                return this.List;
            },
            remove: function (id) {
                var parent = this;
                this.Resource.remove({ _id: id }, function () {
                    var item = parent.List.map(function (i) {
                        return i._id;
                    }).indexOf(id);
                    parent.List.splice(item, 1);
                    
                });
                return parent.List;
                
            },
            add: function (item) {
                var newItem = new this.Resource(item);
                var parent = this;
                var promise = newItem.$save(function (i) { parent.List.push(i); });
                
                return promise;
            },
            update: function (item) {
                var promise = this.Resource.update({ _id: item._id }, item).$promise;
                return promise;
            },
            clear: function () {
                this.List = undefined;

            }
        };

        return (tmDataEntity);

    });

})(this.angular)