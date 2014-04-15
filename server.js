// bring in the express module
var express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local").Strategy;
// set up the environment variable to determine where we are depoloyed
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
// instantiate express
var app = express();
// bring in our config object and getting the correct object based on where we are deployed
var config = require('./server/config/config')[env];
//  configure express based on where we are deployed...in here is where the stylus files get processed
require('./server/config/express')(app, config);
// connect to our database based on where we are deployed
require('./server/config/mongoose')(config);

var User = mongoose.model('User');
passport.use(new LocalStrategy (
    function(username, password, done){
        User.findOne({userName:username}).exec(function(err, user){
            if(user){
                console.log("FoundUser");
                return(done(null,user));
            } else {
                console.log("DidntFoundUser");

                return(done(null,false));
            }
        });
    }
));

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


// set up the express routes
require('./server/config/routes')(app);

app.listen(config.port);

console.log('Listening on port ' + config.port + "...");
