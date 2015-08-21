
var mongoose = require('mongoose'),
    encrypt = require('../utilities/encryption'),
    Q = require('q');
    


var userSchema = mongoose.Schema({
    firstName: {type:String, required:"{PATH} is required!"},
    lastName: {type:String, required:"{PATH} is required!"},
    username: {
        type: String,
        required: "{PATH} is required.",
        unique: true
    },
    company: {type:mongoose.Schema.Types.ObjectId, ref:'Company'},
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
    
    function encryptPassword(user) {
        var salt, hash;
        salt = encrypt.createSalt();
        hash = encrypt.hashPwd(salt, user.firstName.toLowerCase());
        user.hashed_pwd = hash;
        user.salt = salt;
        return user;
    }
    
    var deferred = Q.defer();
    
    User.find({}).exec(function (err, collection) {
        if (collection.length === 0) {

            

            var user1 = encryptPassword({company: companyId, firstName: "nolan", lastName: "james", username: "nolan@nolan.com", roles: ['Bronze'] });
            var user2 = encryptPassword({ company: companyId, firstName: "chris", lastName: "baily", username: "chris@chris.com", roles: ['admin', 'superUser'] });
            var user3 = encryptPassword({company: companyId, firstName: "kim", lastName: "rose", username: "kim@kim.com", roles: ['admin']});
            var user4 = encryptPassword({ company: companyId, firstName: "alex", lastName: "phillips", username: "alex@alex.com", roles: ['Silver'] });
            var user5 = encryptPassword({company: companyId, firstName: "hayley", lastName: "briana", username: "hayley@hayley.com", roles: ['Gold'] });
            //console.log('20 successfully created user documents....');
            User.create(user1, user2, user3, user4, user5, function (err, user1, user2, user3, user4, user5){
                if (err) {
                    deferred.reject(new Error(err));
                }
                // items.push(item1._id);
                // items.push(item2._id);
                console.log('20 succesfully created menuitem documents.....');
                deferred.resolve();
                
            });
            //return User.create(user1, user2, user3, user4, user5);

        }

    });
    return deferred.promise;

}

exports.createDefaultUsers = createDefaultUsers;