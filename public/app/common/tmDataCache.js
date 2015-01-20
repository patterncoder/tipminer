angular.module('app').factory('tmDataCache', [
    'tmCachedCustomers',
    'tmCachedContracts',
    function (
        tmCachedCustomers,
        tmCachedContracts
    ) {




    var Cache = {
        stack: {}, //Cache stack
        load: function (id) { //Load cache if found
            return (typeof (this.stack[id]) != 'undefined') ? this.stack[id] : false;
        },
        save: function (modelCache, id) { //Cache data with unique id
            this.stack[id] = modelCache;
        },
        remove: function (id) {//Remove cache for identifier
            if (typeof (this.stack[id]) != 'undefined')
                delete this.stack[id];
        },
        clearCache: function () {
            console.log(this.stack);
            for (var key in this.stack) {
                if (this.stack.hasOwnProperty(key)) {
                    this.stack[key].clear();
                }
            }
            
        },
        init: function () {
            this.stack = {};
            this.save(tmCachedCustomers, 'customers');
            this.save(tmCachedContracts, 'contracts');
        }
    };

    return Cache;

}]);