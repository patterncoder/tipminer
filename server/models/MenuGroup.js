var mongoose = require('mongoose');
var schema = require('./menuGroup_schema');



var MenuGroup = mongoose.model('MenuGroup', schema.menuGroupSchema);

function createDefaultMenuGroup(companyId, menu) {
    //console.log('in default menu group');
    //console.log(menu);
    var newMenuGroup = new MenuGroup({
        
        meta: {},
        company: companyId,
        title: "new menu group",
        subtitle: "new menu group subtitle",
        menus: [ {
            menuId: menu._id,
            title: menu.title,
            subtitle: menu.subtitle
            }
            
        ]
    });
    console.log('successfully created menu groups document....');
    return newMenuGroup.save();
    
}

exports.createDefaultMenuGroup = createDefaultMenuGroup;