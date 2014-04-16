var passport = require('passport'),
    mongoose = require('mongoose'),
    LocalStrategy = require("passport-local").Strategy;

var User = mongoose.model('User');

module.exports = function(){



passport.use(new LocalStrategy (
    function(username, password, done){
        User.findOne({userName:username}).exec(function(err, user){
            if(user && user.authenticate(password)){
                console.log("FoundUser");
                return(done(null,user));
            } else {
                console.log("DidntFoundUser");

                return(done(null,false));
            }
        });
    }
));

//Used this here to verify that the user is logged in
//app.use(function(req, res, next){
//   console.log(req.user);
//   next();
//});

passport.serializeUser(function(user, done){
    if(user){
        done(null, user._id);
    }
});

passport.deserializeUser(function(id, done){
    User.findOne({_id:id}).exec(function(err, user){
        if(user){
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
});

}