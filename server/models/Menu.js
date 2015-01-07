var mongoose = require('mongoose');

var menuSchema = mongoose.Schema({
    title: String,
    subtitle: String,
    sections: [{
        title: String,
        subtitle: String,
        items: [{type:mongoose.Schema.Types.ObjectId, ref:'MenuItem'}]
    }],
    footer: String
});

var Menu = mongoose.model('Menu', menuSchema);

function createDefaultMenu(items) {
    
    var newMenu = new Menu({
        title: "New Menu",
        subtitle: "New menu subtitle",
        sections: [{
            title: "appetizers",
            subtitle: "our apps are delicious",
            items: items
        }],
        footer: "this is some footer text here"

            }

        );

    return newMenu.save();

}

exports.createDefaultMenu = createDefaultMenu;