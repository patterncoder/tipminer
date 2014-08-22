angular.module('app').controller('tmNavigationCtrl', function ($scope, $http, $window, tmLoginMessageService, tmIdentity) {
    //$scope, $http, $window, tmLoginMessageService, tmIdentity
    //this is a hack here to keep menu on page with a page refresh...just like the login widgit
    if (!!$window.bootstrappedUserObject) {
        $http.get('/api/navigation').success(function (data) {
            $scope.navItems = data;
        });

    }
    //$scope.navItems = [
    //    {
    //        name: "Events",
    //        link: "",
    //        sortOrder: 20,
    //        roles: ["admin"],
    //        navItems: [{ name: "Customers", link: "/customers", sortOrder: 10, roles: ["admin", "superUser"] },
    //        { name: "Contracts", link: "/contracts", sortOrder: 20, endSection: false, roles: ["admin", "superUser"] }
    //        ]
    //    },
    //    {
    //        name: "Admin",
    //        link: "",
    //        sortOrder: 100,
    //        roles: ["admin"],
    //        navItems: [{ name: "Users", link: "/admin/users", sortOrder: 10, roles: ["admin", "superUser"] }
    //        ]
    //    },
    //    {
    //        name: "Dev",
    //        link: "",
    //        sortOrder: 150,
    //        roles: ["superUser"],
    //        navItems: [{ name: "Dev Notes", link: "/dev/notes", sortOrder: 10, roles: ["superUser"] }
    //        ]
    //    },
    //    {
    //        name: "CopyMe Nav",
    //        link: "",
    //        sortOrder: 1000,
    //        roles: ["superUser"],
    //        navItems: [{ name: "CopyMe Nav", link: "", sortOrder: 0, roles: ["superUser"] }
    //        ]
    //    }

    //];


    $scope.identity = tmIdentity;

    $scope.$on('loggedIn', function () {
        
        $http.get('/api/navigation').success(function (data) {
            $scope.navItems = data;
        });
    });

    $scope.$on('loggedOut', function () {
        
        $scope.navItems = [];
    });

   

})