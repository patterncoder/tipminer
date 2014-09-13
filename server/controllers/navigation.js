var _ = require('lodash');

exports.getNavigation = function (req, res) {
    
var navItems = [
        {
            name: "Events",
            link: "",
            sortOrder: 20,
            roles: ["admin"],
            navItems: [{ name: "Customers", link: "/events/customers", sortOrder: 10, roles: ["admin", "superUser"] },
            { name: "Contracts", link: "/events/contracts", sortOrder: 20, endSection: false, roles: ["admin", "superUser"] }
            ]
        },
        {
            name: "Admin",
            link: "",
            sortOrder: 100,
            roles: ["admin"],
            navItems: [{ name: "Users", link: "/admin/users", sortOrder: 10, roles: ["admin", "superUser"] }
            ]
        },
        {
            name: "Dev",
            link: "",
            sortOrder: 150,
            roles: ["superUser"],
            navItems: [{ name: "Dev Notes", link: "/dev/notes", sortOrder: 10, roles: ["superUser"] }
            ]
        },
        {
            name: "CopyMe Nav",
            link: "",
            sortOrder: 1000,
            roles: ["superUser"],
            navItems: [{ name: "CopyMe Nav", link: "", sortOrder: 0, roles: ["superUser"] }
            ]
        }
        
];

var filteredNavItems = [];
var myroles = req.user.roles;
GetNavItems(navItems, filteredNavItems)

function isReqRolesInNavRoles(reqRoles, navRoles) {
    //reqRoles loop
    var reqRolesLen = reqRoles.length;
    for (var reqRolesIndx = 0; reqRolesIndx < reqRolesLen; reqRolesIndx++) {
            var navRolesLen = navRoles.length;
            for (var navRolesIndx = 0; navRolesIndx < navRolesLen; navRolesIndx++) {
                if (reqRoles[reqRolesIndx] === navRoles[navRolesIndx]) return true;
            };
    };
};

function addItemToNavigation(item, arr) {
    arr.push(item);
};

function GetNavItems(allItems, filteredItems) {
    allItems.forEach(function(navItem){
        //my first lodash call!!!
        var newNavItem = _.cloneDeep(navItem);
        
        if(navItem.navItems.length > 0){
            //console.log('I have navItems');
            newNavItem.navItems = [];
            navItem.navItems.forEach(function (subNavItem) {
                //console.log("I am in a subNavItem loop");
                if (isReqRolesInNavRoles(myroles, subNavItem.roles))
                {
                    //console.log("And i have a proper role");
                    newNavItem.navItems.push(subNavItem);
                }
            });
        }
        if(isReqRolesInNavRoles(myroles,navItem.roles)){
            addItemToNavigation(newNavItem, filteredItems)
        };
    });
    return filteredItems;
}





//console.log(filteredNavItems);
res.send(filteredNavItems);

};