var mongoose = require('mongoose');

var menuSchema = mongoose.Schema({
    meta: {
            dateCreated: { type: Date, default: Date.now },
            description: String
        },
    company: {type:mongoose.Schema.Types.ObjectId, ref:'Company'},
    title: String,
    
    subtitle: String,
    
    sections: [{
        title: String,
        subtitle: String,
        
        //items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' }],
        items: [{
            menuItemId: mongoose.Schema.Types.ObjectId,
            name: String,
            description: String,
            prices: [{
                price: Number,
                priceFor: String
            }]
        }],
        footer: String
    }],
    footer: String
});

var Menu = mongoose.model('Menu', menuSchema);

function createDefaultMenu(companyId, items) {
    
    var newMenu = new Menu({
        meta: {description: "This is the first test menu in the database"},
        company: companyId,
        title: "New Menu",
        subtitle: "New menu subtitle",
        sections: [{
            title: "appetizers",
            subtitle: "our apps are delicious",
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
            footer: 'Some footer info'
        }],
        footer: "this is some footer text here"

            }

        );
        
        

    console.log('40 successfully created menu document....');
    return newMenu.save();

}

exports.createDefaultMenu = createDefaultMenu;