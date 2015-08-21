var passport = require('passport'),
    mongoose = require('mongoose'),
    LocalStrategy = require("passport-local").Strategy,
    User = mongoose.model('User');
    var Company = require('mongoose').model('Company');

module.exports = function () {
    //I think this is where the req.user property get set and therefore
    //how we can access roles and what not for the user.
    passport.use(new LocalStrategy(
        function (username, password, done) {
            //console.log("In local strategy");
            User.findOne({ username: username }).exec(function (err, user) {
                if (user && user.authenticate(password)) {
                    //console.log("Found User");
                    //console.log(user);
                    Company.findOne({_id: user.company}).exec(function(err, company){
                        var accountLockout = company.isAccountLockout();
                        user = user.toObject();
                        user.accountLockout = accountLockout;
                        delete user.salt;
                        delete user.hashed_pwd;
                        //console.log(user);
                        return (done(null, user));
                    });
                    
                    
                    
                } else {
                    //console.log("Didnt Find User");

                    return (done(null, false));
                }
            });
        }
    ));

    //Used this here to verify that the user is logged in
    //app.use(function(req, res, next){
    //   console.log(req.user);
    //   next();
    //});

    passport.serializeUser(function (user, done) {
        if (user) {
            
            done(null, user._id);
        }
    });

    passport.deserializeUser(function (id, done) {
        User.findOne({ _id: id }).exec(function (err, user) {
            if (user) {
                Company.findOne({_id: user.company}).exec(function(err, company){
                        var accountLockout = company.isAccountLockout();
                        user = user.toObject();
                        user.accountLockout = accountLockout;
                        delete user.salt;
                        delete user.hashed_pwd;
                        //console.log(user);
                        return (done(null, user));
                    });
                
                
            } else {
                return done(null, false);
            }
        });
    });

};