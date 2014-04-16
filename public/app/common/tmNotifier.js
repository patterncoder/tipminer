angular.module('app').value('tmToastr', toastr);

angular.module('app').factory('tmNotifier', function(tmToastr){
    return {
        notify: function(msg){
            tmToastr.success(msg);
            console.log(msg);
        }
    }
});