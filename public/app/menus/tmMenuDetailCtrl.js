(function (angular) {
    'use strict';
    angular.module('app').controller('tmMenuDetailCtrl', 
        ['$scope', 
        '$modalInstance', 
        'tmModalServiceSvc', 
        'tmDataCache', 
        'tmNotifier', 
        '$stateParams', 
        '$state', 
        '$q', 
        '$rootScope', 
        'tmPubSubService', 
        'mongoose',  
        Controller]);

    function Controller(
        $scope, 
        $modalInstance, 
        tmModalServiceSvc, 
        tmDataCache, 
        tmNotifier, 
        $stateParams, 
        $state, 
        $q, 
        $rootScope, 
        tmPubSubService, 
        mongoose) {
        // see angular for documentation for and easy reset pattern to undo changes before saving
        var vm = this;
        var menusCache;
        vm.pageTitle = "Production > Menu Detail";

        function init() {
            menusCache = tmDataCache.load('Menus');
            menusCache.getOne($stateParams.id, true)
            .then(function(data, status){
                    //this handles if someone types in a bad url
                    if(data.noData) {
                        tmNotifier.notify('That request was not found');
                        $modalInstance.close();
                        $state.go('menus');
                    }
                    
                    vm.menu = data;
                    vm.master = angular.copy(data);
                    
                });
            
        }
        
        
        var menuItemPriceSchema = new mongoose.Schema({
            price: {type:Number, default: 0},
            priceFor: String
        });
        
        var menuItemSchema = new mongoose.Schema({
                menuItemId: mongoose.Schema.Types.ObjectId,
                name: {type: String, required: "{PATH} is required."},
                description: String,
                prices: [menuItemPriceSchema]
        });
        
        var menuSectionSchema = new mongoose.Schema({
                title: {type: String, required: "{PATH} is required."},
                subtitle: String,
                items: [menuItemSchema],
                footer: String
        });
        
        var menuSchema = new mongoose.Schema({
                meta: {
                    name: {type: String, required: "{PATH} is required."},
                    description: String,
                    dateCreated: { type: Date, default: Date.now },
                    lastModified: {type: Date, default: Date.now}
                },
                company: {type:mongoose.Schema.Types.ObjectId, ref:'Company'},
                title: {type: String, required: "{PATH} is required."},
                subtitle: String,
                sections: [menuSectionSchema],
                footer: String
        });

        
        
        vm.reset = function (){
            
            vm.menu = vm.master;
            vm.menuDetailForm.$setPristine();
        };
        
        vm.addSection = function(newTab) {
            var NewSection = {title: 'New Section', subtitle: "", footer:""};
            vm.menu.sections.push(NewSection);
            vm.menuDetailForm.$setDirty();
            
            
        };
        
        vm.removeSection = function () {
            
        };
        
        vm.removeMenuItem = function () {
            
        };
        
        vm.close = function () {

            var modalOptions = {
                closeButtonText: 'No',
                actionButtonText: 'Yes',
                headerText: 'Wait!',
                bodyText: 'Do you want to leave without saving??'
            };
            
            if(vm.menuDetailForm.$pristine) {
                $modalInstance.close();
                $state.go('menus');
            } 
            else {
                tmModalServiceSvc.showModal({}, modalOptions).then(function(result){
                    
                    vm.reset();
                    $modalInstance.close();
                    $state.go('menus');
                });
            }
        };
        
        vm.saveChangesAndClose = function () {
            vm.saveChanges(true);
            
        };
        
        vm.err;
        vm.isCollapsed = false;
        
        
        
        vm.saveChanges = function (saveAndClose) {
            var valDoc = new mongoose.Document(vm.menu, menuSchema);
            valDoc.validate(function(err){
                if(err) {
                    vm.err = err; 
                    $scope.$apply(); 
                    return; 
                }
                menusCache.update(vm.menu).then(function () {
                    
                    tmNotifier.notify("The menu record has been updated");
                    
                    
                    
                    vm.menuDetailForm.$setPristine();
                    vm.master = angular.copy(vm.menu);
                    
                    if(saveAndClose){
                        $modalInstance.close();
                        $state.go('menus');
                    }
                    
                    },
                    function (reason) {
                        tmNotifier.error(reason);
                    }
                );
            });
                
                
            
            
            
        };
        
        
        
        init();

    }



}(this.angular));


// vm.menuFields = [
//             {
//                 className: 'row',
//                 fieldGroup: [
//                     {
//                         key: 'meta.name',
//                         className: 'col-xs-6',
//                         type: 'input',
//                         templateOptions: {
//                             type: 'text',
//                             label: 'Menu Name',
//                             placeholder: 'Enter Menu Name',
//                             required: true
//                             }
//                     },
//                     {   key: 'meta.description',
//                         className: 'col-xs-6',
//                         type: 'input',
//                         templateOptions: {
//                             type: 'text',
//                             label: 'Menu Description',
//                             placeholder: 'Enter Menu Description',
//                             required: true
//                         }
//                     }
//                 ]
//             },
//             {
//                 className: 'row',
//                 fieldGroup: [
//                     {key: 'title',
//                     type: 'input',
//                     className: 'col-xs-6',
//                     templateOptions: {
//                         type: 'text',
//                         label: 'Title',
//                         placeholder: 'Enter Menu Title',
//                         required: true
//                     }
//                 },
//             {key: 'footer',
//                 type: 'input',
//                 className: 'col-xs-6',
//                 templateOptions: {
//                     type: 'text',
//                     label: 'Footer',
//                     placeholder: 'Enter Menu Footer',
//                     required: true
//                 }},
//             {
//                 type: 'anotherType',
//                 key: 'footer'
//             }
//                 ]
//             }
            
            
//         ];
        
//         vm.options = {
//             formState: {
//                 foo: 'bar'
//             }
//         };