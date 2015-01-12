
(function (angular) { 

angular.module('app').factory('util',['$q', '$rootscope', 'tmNotifier', factory]);

function factory($q, $rootscope, tmNotifier) {

    return {
        $q: $q,
        logger: tmNotifier,
        $broadcast: $broadcast

    };

    function $broadcast() {
        return $rootscope.$broadcast.apply($rootscope, arguments);
    }

}
    

})(this.angular)
