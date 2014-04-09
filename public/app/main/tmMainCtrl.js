angular.module('app').controller('tmMainCtrl', function($scope){

    $scope.myVar = "Hello Angular";

    $scope.contracts = [
        {name:'Johnson', featured:true, published: new Date('10/5/2013')}

        ,{name:'Smith', featured:true, published: new Date('10/5/2013')}
        ,{name:'Rose', featured:true, published: new Date('10/5/2013')}
        ,{name:'Garvey', featured:true, published: new Date('10/5/2013')}
        ,{name:'Russel', featured:true, published: new Date('10/5/2013')}
        ,{name:'Lopes', featured:true, published: new Date('10/5/2013')}
        ,{name:'Cey', featured:true, published: new Date('10/5/2013')}
        ,{name:'Johnson', featured:true, published: new Date('10/5/2013')}
        ,{name:'Johnson', featured:true, published: new Date('10/5/2013')}
    ];
});