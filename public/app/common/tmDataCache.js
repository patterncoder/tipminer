(function (angular) {
angular.module('app').factory('tmDataCache', [
    'tmCachedCustomers',
    'tmCachedContracts',
    'tmContract',
    'tmCustomer',
    'tmDataEntity',
    'tmMenuItem',
    'tmLookups',
    Factory]);
function Factory(tmCachedCustomers,
        tmCachedContracts,
        tmContract,
        tmCustomer,
        tmDataEntity,
        tmMenuItem,
        tmLookups){
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
            //console.log(this.stack);
            for (var key in this.stack) {
                if (this.stack.hasOwnProperty(key)) {
                    this.stack[key].clear();
                }
            }
            
        },
        init: function () {
            this.stack = {};
            //var Contracts = new tmDataEntity(tmContract);
            //var Customers = new tmDataEntity(tmCustomer);
            //var MenuItems = new tmDataEntity(tmMenuItem);
            this.save(new tmDataEntity(tmContract), 'Contracts');
            this.save(new tmDataEntity(tmCustomer), 'Customers');
            this.save(new tmDataEntity(tmMenuItem), 'MenuItems');
            this.save(new tmDataEntity(tmLookups), 'Lookups');
            
        }
    };

    return Cache;
}
}(this.angular));

    

