var mongoose = require('mongoose');

var navigationSchema = mongoose.Schema({
    
        name: String,
        link: String,
        sortOrder: Number,
        roles: [String],
        navItems: [{
            name: String,
            link: String,
            sortOrder: Number,
            endSection: Boolean,
            roles: [String]
        }]


    }

);

var Navigation = mongoose.model('Navigation', navigationSchema);

function createDefaultNavigation() {
    Navigation.find({}).exec(function (err, collection) {
        if (err) {
            console.log(err);
        }

        
        if (collection.length === 0) {
           
        var navigations = [{
                name: "Events",
                link: "",
                sortOrder: 20,
                roles: ["admin","Bronze","Silver", "Gold"],
                navItems: [{ name: "Customers", link: "/events/customers", sortOrder: 10, roles: ["Bronze","Silver","admin", "superUser"] },
                { name: "Contracts", link: "/events/contracts", sortOrder: 20, endSection: true, roles: ["Bronze","admin", "superUser"] }
                ]
        },
        {
            name: "Production",
            link: "",
            sortOrder: 30,
            roles: ["admin"],
            navItems: [{ name: "Menu Items", link: "/production/menuItems", sortOrder: 20, roles: ["admin", "superUser"] },
                { name: "Menus", link: "/production/menus", sortOrder: 10, roles: ["admin", "superUser"] }
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

        console.log('50 successfully created navigation documents....');

        return Navigation.create(navigations);
          
        }

        
    });

}

exports.createDefaultNavigation = createDefaultNavigation;