var mongoose = require('mongoose');
var schema = require('./menu_Schema');



var Menu = mongoose.model('Menu', schema.menuSchema);

function createDefaultMenu(companyId, items) {
    
    var newMenu = new Menu({
        meta: {name:"150822 Dinner Menu",description: "This is the first test menu in the database"},
        company: companyId,
        title: "Dinner Menu",
        subtitle: "Our menu is prepared daily from fresh ingredients.",
        sections: [{
            title: "Appetizers",
            subtitle: "Enjoy an assortment family style for larger parties!",
            //items: [items.one, items.two],
            items: [{menuItemId: items[0]._id,
                    name: items[0].name,
                    description: items[0].description
                },
                {menuItemId: items[1]._id,
                    name: items[1].name,
                    description: items[1].description
                    }
                ],
            footer: '* able to be served family style'
        }],
        footer: "Happy customers is our one and only goal!"

            }

        );
        
        

    console.log('40 successfully created menu document....');
    return newMenu.save();

}

exports.createDefaultMenu = createDefaultMenu;
