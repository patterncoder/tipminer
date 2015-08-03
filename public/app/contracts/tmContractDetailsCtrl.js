(function (angular) {
    angular.module('app').controller('tmContractDetailsCtrl', ['tmDataCache', '$stateParams', Controller]);
    
    function Controller(tmDataCache, $stateParams) {
        var vm = this;
        var contractsCache;
        function init() {
            
            contractsCache = tmDataCache.load('Contracts');
            contractsCache.query().then(function (collection) {
            collection.forEach(function (contract) {
                    if (contract._id === $stateParams.id) {
                        vm.contract = contract;
                    }
                });
            });
        }
        
        init();
        
        

    }
}(this.angular));

