var mongoose = require('mongoose');

exports.metaSchema =  {
            dateCreated: { type: Date, default: Date.now },
            dateLastMod: {type: Date},
            company: String 
            //{type:mongoose.Schema.Types.ObjectId, ref:'Company'}
};