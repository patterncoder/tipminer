
var mongoose = require('mongoose'),
    encrypt = require('../utilities/encryption');


var userSchema = mongoose.Schema({
    firstName: {type:String, required:"{PATH} is required!"},
    lastName: {type:String, required:"{PATH} is required!"},
    username: {
        type: String,
        required: "{PATH} is required.",
        unique: true
    },
    company: String,
    //adding security fields here
    salt: {type:String, required:"{PATH} is required!"},
    hashed_pwd: {type:String, required:"{PATH} is required!"},
    roles: [String]

});

userSchema.methods = {
    authenticate: function (passwordToMatch) {
        return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    },
    hasRole: function (role) {
        return this.roles.indexOf(role) > -1;
    }
};

var User = mongoose.model('User', userSchema);

function createDefaultUsers(companyId) {

    console.log("this is the companyId passed in " + companyId);
    User.find({}).exec(function (err, collection) {
        if (collection.length === 0) {

            var salt, hash;
            console.log('User Insert 1');
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'nolan');
            User.create({company: companyId, firstName: "nolan", lastName: "james", username: "nolan@nolan.com", salt: salt, hashed_pwd: hash, roles: ['Bronze'] });
            console.log('User Insert 2');
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'chris');
            User.create({ company: companyId, firstName: "chris", lastName: "baily", username: "chris@chris.com", salt: salt, hashed_pwd: hash, roles: ['admin', 'superUser'] });
            console.log('User Insert 3');
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'kim');
            User.create({ company: companyId, firstName: "kim", lastName: "rose", username: "kim@kim.com", salt: salt, hashed_pwd: hash, roles: ['admin'] });
            console.log('User Insert 4');
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'alex');
            User.create({ company: companyId, firstName: "alex", lastName: "phillips", username: "alex@alex.com", salt: salt, hashed_pwd: hash, roles: ['Silver'] });
            console.log('User Insert 5');
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'hayley');
            User.create({ company: companyId, firstName: "hayley", lastName: "briana", username: "hayley@hayley.com", salt: salt, hashed_pwd: hash, roles: ['Gold'] });


        }

    });

}

exports.createDefaultUsers = createDefaultUsers;