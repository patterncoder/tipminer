var mongoose = require('mongoose'),
    validate = require('../utilities/validators'),
    Q = require('q');

var companySchema = mongoose.Schema({
    companyName: {
        type: String,
        required: "{PATH} is required.",
        unique: true
    },
    addresses: [{
        addressType: String,
        primary: Boolean,
        address1: String,
        address2: String,
        city: String,
        state: { type: String, enum: validate.validators.stateCodes },
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
    }]


});

var Company = mongoose.model('Company', companySchema);

function createDefaultCompany() {
    var deferred = Q.defer();

    Company.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            var company = Company.create({
                companyName: "Old Town Dining, LLC",
                addresses: [{
                    addressType: "Headquarters",
                    primary: true,
                    address1: "28699 Old Town Front Street",
                    city: "Temecula",
                    state: "CA",
                    zip: "92592"
                }],
                emails: [{
                    emailType: "Headquarters",
                    primary: true,
                    email: "chris@oldtowndining.com"
                }],
                contactNumbers: [{primary:true, contactType:"Main",number:"9516769567"}]
            }, function (err, company) {
                if (err) {
                    deferred.reject(new Error(err));
                } else {
                    console.log("the company id " + company._id);
                    
                    deferred.resolve(company._id);
                    console.log(deferred.promise);
                }
            });
            
        }

    });

    return deferred.promise;
}

exports.createDefaultCompany = createDefaultCompany;