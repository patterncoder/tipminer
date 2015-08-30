
var mongoose = require('mongoose');


var menuItemPriceSchema = new mongoose.Schema({
    price: {type:Number, default: 0},
    priceFor: String
});

var menuItemSchema = new mongoose.Schema({
        menuItemId: mongoose.Schema.Types.ObjectId,
        name: {type: String, required: "{PATH} is required."},
        description: String,
        prices: [menuItemPriceSchema]
});

var menuSectionSchema = new mongoose.Schema({
        title: {type: String, required: "{PATH} is required."},
        subtitle: String,
        items: [menuItemSchema],
        footer: String
});

exports.menuSchema = new mongoose.Schema({
        meta: {
            name: {type: String, required: "{PATH} is required."},
            description: String,
            dateCreated: { type: Date, default: Date.now },
            lastModified: {type: Date, default: Date.now}
        },
        company: {type:mongoose.Schema.Types.ObjectId, ref:'Company'},
        title: {type: String, required: "{PATH} is required."},
        subtitle: String,
        sections: [menuSectionSchema],
        footer: String
});