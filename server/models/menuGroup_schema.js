var mongoose = require('mongoose');

exports.menuGroupSchema = mongoose.Schema({
    meta: {
            dateCreated: { type: Date, default: Date.now },
            description: String,
            state: { type: String, default: "created"}
        },
    company: {type:mongoose.Schema.Types.ObjectId, ref:'Company'},
    title: String,
    
    subtitle: String,
    
    menus: [ {
        menuId: mongoose.Schema.Types.ObjectId,
        title: String,
        subtitle: String
    }  ]
        
});

