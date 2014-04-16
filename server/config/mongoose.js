var mongoose = require('mongoose'),
    crypto = require('crypto'); //crypto is built into node

module.exports = function (config) {

    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open',function callback(){
        console.log('tipminer db opened');
    });

    var userSchema = mongoose.Schema({
        firstName: String
        ,lastName: String
        ,userName: String
        //adding security fields here
        ,salt: String
        ,hashed_pwd: String

    });

    userSchema.methods = {
        authenticate: function(passwordToMatch){
            return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
        }
    }

    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function(err, collection){
        if(collection.length === 0) {

            var salt, hash;
            salt = createSalt();
            hash = hashPwd(salt, 'Chris');
            User.create({firstName:"Chris", lastName:"Baily", userName:"Chris", salt:salt, hashed_pwd:hash});
            salt = createSalt();
            hash = hashPwd(salt, 'Kim');
            User.create({firstName:"KIm", lastName:"Rose", userName:"Kim", salt:salt, hashed_pwd:hash});
            salt = createSalt();
            hash = hashPwd(salt, 'Nolan');
            User.create({firstName:"Nolan", lastName:"James", userName:"Nolan", salt:salt, hashed_pwd:hash});

        }

    })

//var messageSchema = mongoose.Schema({message:String});
//var Message = mongoose.model('Message', messageSchema);
//var mongoMessage;
//Message.findOne().exec(function(err, messageDoc){
//   mongoMessage = messageDoc.message;
//});

};

function createSalt() {
    return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt,pwd){
    var hmac = crypto.createHmac('sha1', salt);
    return hmac.update(pwd).digest('hex');
}