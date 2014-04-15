var mongoose = require('mongoose');

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

    })

    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function(err, collection){
        if(collection.length === 0) {
            User.create({firstName:"Chris", lastName:"Baily", userName:"Chris"});
            User.create({firstName:"KIm", lastName:"Rose", userName:"Kim"});
            User.create({firstName:"Nolan", lastName:"James", userName:"Nolan"});

        }

    })

//var messageSchema = mongoose.Schema({message:String});
//var Message = mongoose.model('Message', messageSchema);
//var mongoMessage;
//Message.findOne().exec(function(err, messageDoc){
//   mongoMessage = messageDoc.message;
//});

};