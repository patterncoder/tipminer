var mongoose = require('mongoose');
var sharedSchema = require('./sharedSchemas');



exports.contractSchema = mongoose.Schema({
    meta: sharedSchema.metaSchema,
    //company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    name: {type:String, required:'{PATH} is required!'},
    date: {type:Date, required:'{PATH} is required!'},
    contract: {type:Boolean, required:'{PATH} is required!'},
    nature: {type:String, required:'{PATH} is required!'},
    tags: [String]
});