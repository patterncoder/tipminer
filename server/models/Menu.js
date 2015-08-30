var mongoose = require('mongoose');
var schema = require('./menu_Schema');

// var menuItemPriceSchema = new mongoose.Schema({
//     price: {type:Number, default: 0},
//     priceFor: String
// });

// var menuItemSchema = new mongoose.Schema({
//         menuItemId: mongoose.Schema.Types.ObjectId,
//         name: {type: String, required: "{PATH} is required."},
//         description: String,
//         prices: [menuItemPriceSchema]
// });

// var menuSectionSchema = new mongoose.Schema({
//         title: {type: String, required: "{PATH} is required."},
//         subtitle: String,
//         items: [menuItemSchema],
//         footer: String
// });

// var menuSchema = new mongoose.Schema({
//         meta: {
//             name: {type: String, required: "{PATH} is required."},
//             description: String,
//             dateCreated: { type: Date, default: Date.now },
//             lastModified: {type: Date, default: Date.now}
//         },
//         company: {type:mongoose.Schema.Types.ObjectId, ref:'Company'},
//         title: {type: String, required: "{PATH} is required."},
//         subtitle: String,
//         sections: [menuSectionSchema],
//         footer: String
// });

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
