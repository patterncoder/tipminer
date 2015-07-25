


exports.isAuthorized = function (roles, activity) {

    var wantedActivity = activities.filter(function (item) { return (item.name == activity); });
    var len = wantedActivity[0].roles.length;
    
    //loop through all of the roles for the activity
    for (var i = 0; i < len; i++) {
        
            if (roles.indexOf(wantedActivity[0].roles[i].valueOf()) > -1) {
                return true;
            } 
    }
    
    return false;
   
};

// no check here for uniqueness...identical object names would crash
var activities = [
    { name: "GET /api/users", roles: ["admin", "wimpyUser"] },
    { name: "POST /api/users", roles: ["admin", "wimpyUser"] },
    { name: "PUT /api/users", roles: ["admin", "wimpyUser"] },
    // /api/customers
    { name: "GET /api/customers", roles: ["Bronze","admin", "superUser"] },
    { name: "PUT /api/customers", roles: ["Bronze","Silver","admin", "superUser"] },
    { name: "DELETE /api/customers", roles: ["Bronze","Silver","Gold", "admin", "superUser"] },
    { name: "POST /api/customers", roles: ["Silver", "admin", "superUser"] }
    
];