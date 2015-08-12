var mongoose = require('mongoose');

var menuGroupSchema = mongoose.Schema({
    meta: {
            dateCreated: { type: Date, default: Date.now },
            description: String
        },
    company: {type:mongoose.Schema.Types.ObjectId, ref:'Company'},
    title: String,
    
    subtitle: String,
    
    menus: [ mongoose.Schema.Types.ObjectId ]
        
});

var MenuGroup = mongoose.model('MenuGroup', menuGroupSchema);

function createDefaultMenuGroup(companyId, menu) {
    //console.log('in default menu group');
    //console.log(menu);
    var newMenuGroup = new MenuGroup({
        
        meta: {},
        company: companyId,
        title: "new menu group",
        subtitle: "new menu group subtitle",
        menus: [ menu._id
            
        ]
    });
    console.log('successfully created menu groups document....');
    return newMenuGroup.save();
    
}

exports.createDefaultMenuGroup = createDefaultMenuGroup;