var mongoose = require('mongoose');

var menuSchema = mongoose.Schema({
    company: {type:mongoose.Schema.Types.ObjectId, ref:'Company'},
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

function createDefaultMenu(companyId, items) {
    
    var newMenu = new Menu({
        company: companyId,
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

    console.log('40 successfully created menu document....');
    return newMenu.save();

}

exports.createDefaultMenu = createDefaultMenu;