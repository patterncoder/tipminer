


exports.isAuthorized = function (roles, activity) {

    var wanted = activities.filter(function (item) { return (item.name == activity); });
    var len = wanted[0].roles.length;
    
    //loop through all of the roles for the activity
    for (var i = 0; i < len; ++i) {
        
            if (roles.indexOf(wanted[0].roles[i].valueOf()) > -1) {
                return true;
            } else {
                return false;
            };

    }
   
};

// no check here for uniqueness...identical object names would crash
var activities = [
    { name: "GET /api/users", roles: ["admin", "wimpyUser"] }
    ,{ name: "POST /api/users", roles: ["admin", "superUser"] }
];