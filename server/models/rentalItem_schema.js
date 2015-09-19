var mongoose = require('mongoose');
var sharedSchema = require('./sharedSchemas');

var contact = {
	firstName: String,
	lastName: String,
	phone: Number,
	email: String
};


exports.rentalItemSchema = mongoose.Schema({
	meta: sharedSchema.metaSchema,
    name: String,
    price: Number,
    inHouse: Boolean,
   	contact: contact

});



