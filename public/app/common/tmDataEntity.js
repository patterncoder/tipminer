(function (angular) {

    angular.module('app').factory('tmDataEntity', ['$q', Factory]);
    
    function Factory ($q) {
        var List;
        function tmDataEntity(resource) {
            
            this.Resource = resource;

        }

        tmDataEntity.prototype = {
            query: function (queryString) {
                var deferred = $q.defer();
                var self = this;
                
                if (!self.List) {
                    self.Resource.query(function(data){
                        self.List = data;
                        deferred.resolve(self.List);
                    });
                    
                }
                else {
                    deferred.resolve(self.List);
                }
                
                return deferred.promise;
                
            },

            getOne: function (id,fullDocumentFromDb){
                
                var deferred = $q.defer();
                var self = this;
                if (!self.List){
                    // this case is pretty rare...it requires putting in a details url with a record
                    // id so we have to first populate the the full list then get the full record of the detail
                    self.Resource.query(function(data){
                        self.List = data;
                        self.Resource.get({_id: id}, function (data) {
                    
                            var itemIndex = self.List.map(function (i) {
                                return i._id;
                                }).indexOf(id);
                            self.List[itemIndex] = data;
                            deferred.resolve(data);
                        });
                        
                    });
                    // self.Resource.get({_id: id}, function(data){
                    //     self.List = data;
                    //     console.log(data);
                    //     deferred.resolve(data);
                        
                    // });
                } 
                else {
                    if (fullDocumentFromDb){
                        self.Resource.get({_id: id}, function (data) {
                    
                            var itemIndex = self.List.map(function (i) {
                                return i._id;
                                }).indexOf(id);
                            self.List[itemIndex] = data;
                            var dataCopy = angular.copy(data);
                            deferred.resolve(dataCopy);
                            
                        });
                    }
                    else {
                        self.List.forEach(function (item) {
                        if (item._id === id) {
                            deferred.resolve(item);
                        }});
                    }
                }
                
                
                
                return deferred.promise;
                
                
            },
            update: function (item) {
                //put revised object back in the cache
                var self = this;
                var itemIndex = self.List.map(function (i) {
                                return i._id;
                                }).indexOf(item._id);
                self.List[itemIndex] = item;
                delete item.$resolved;
                var promise = this.Resource.update({ _id: item._id }, item).$promise;
                console.log(self.List);
                return promise;
            },
            
            remove: function (id) {
                
                var self = this;
                var deferred = $q.defer();
                
                this.Resource.remove({ _id: id }, function () {
                    var item = self.List.map(function (i) {
                        return i._id;
                    }).indexOf(id);
                    self.List.splice(item, 1);
                    
                    deferred.resolve(self.List);

                });
                
                return deferred.promise;
                

            },
            
            add: function (item) {
                var newItem = new this.Resource(item);
                var self = this;
                var promise = newItem.$save(function (i) { self.List.push(i); });

                return promise;
            },
            
            
            
            clear: function () {
                this.List = undefined;

            }
        };

        return (tmDataEntity);

    }

}(this.angular));

