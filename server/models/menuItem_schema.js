var mongoose = require('mongoose');

exports.menuItemSchema = mongoose.Schema({
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    name: String,
    description: String,
    category: String,
   
    variations: [{name:String,description:String}],

});