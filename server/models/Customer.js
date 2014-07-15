var mongoose = require('mongoose'),
validate = require('../utilities/validators');

//var zipCodeValidator = [validators.validateZipCode, 'Zip code is invalid'];

//var emailValidator = [validators.validateEmail, 'Email address is invalid'];

var customerSchema = mongoose.Schema({

    name: {
        firstName: { type: String, required: "{PATH} is required!" },
        lastName: { type: String, required: "{PATH} is required!" }
    },
    firstName: { type: String },
    lastName: { type: String },
    addresses: [{
        addressType: String,
        primary: Boolean,
        address1: String,
        address2: String,
        city: String,
        state: {type: String, enum: validate.validators.stateCodes}, 
        zip: { type: String, validate: validate.validators.zipCodeValidator }
    }],
    emails: [{
        emailType: String,
        primary: Boolean,
        email: { type: String, validate: validate.validators.emailValidator }
    }], 
    contactNumbers: [{
        primary: Boolean,
        contactType: String,
        number: { type: String }
    }],
    contracts: [{ 
        contractID: Number
    }] 

}); 

var Customer = mongoose.model('Customer', customerSchema);

function createDefaultCustomers() {

    Customer.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            Customer.create({
                name: {
                    firstName: 'Chrissy',
                    lastName: 'Baily'
                },
                firstName: 'Christopher',
                lastName: 'Baily',
                addresses: [{
                    primary: true,
                    addressType: "Home",
                    address1: "43940 Gatewood Way",
                    city: "Temecula",
                    state: "CA",
                    zip: "92592"
                }],
                emails: [{ 
                    primary: true,
                    emailType: "personal",
                    email: 'chris@oldtowndining.com'

                }],
                contactNumbers: [{
                    primary: true,
                    contactType: "Cell",
                    number: '951-265-6398'
                }]

            }, function (err) {
                if (err) { 
                    console.log(err.errors);
                }
                
            });
            Customer.create({
                name: {
                    firstName: 'Kimmy',
                    lastName: 'Baily'
                },
                firstName: 'Kimberly',
                lastName: 'Baily',
                addresses: [{
                    primary: true,
                    addressType: "Home",
                    address1: "43940 Gatewood Way",
                    city: "Temecula",
                    state: "CA",
                    zip: "92592"
                }],
                emails: [{
                    primary: true,
                    emailType: "personal",
                    email: 'kim@oldtowndining.com'

                }],
                contactNumbers: [{
                    primary: true,
                    contactType: "Cell",
                    number: '951-265-8219'
                }]

            }, function (err) {
                if (err) {
                    console.log(err.errors);
                }

            });

        } 
    });
} 

exports.createDefaultCustomers = createDefaultCustomers;


