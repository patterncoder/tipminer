var mongoose = require('mongoose');
var sharedSchema = require('./sharedSchemas');


exports.venuesSchema = mongoose.Schema({
	meta: sharedSchema.metaSchema,
	name: String,
	description: String,
	capacity: Number,
	price: Number,
	notes: String
});



