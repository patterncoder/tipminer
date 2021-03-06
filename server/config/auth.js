var passport = require('passport');
var rolesRepository = require('./rolesRepository');



exports.authenticate = function (req, res, next) {
    //console.log("here i am" + JSON.stringify(req.body));
    "use strict";
    req.body.username = req.body.username.toLowerCase();
    //console.log(req.method + " " + req.route.path);
    var auth = passport.authenticate('local', function (err, user) {
        if (err) {
            //console.log("authenticate didn't work");
            return next(err);
        }
        if (!user) {
            //console.log("authenticate worked but couldn't match user");
            res.send({ success: false });
        }

        req.logIn(user, function (err) {

            if (err) {
                return next(err);
            }
            //console.log("authenticate worked");
            // check acount payment status here
            // If account payment not current then res.send(payment page?)
            // else continue on below?
            
            // Company.findOne({_id: user.company}).exec(function(err, company){
            //     var accountLockout = company.isAccountLockout();
            //     user = user.toObject();
            //     user.accountLockout = accountLockout;
            //     delete user.salt;
            //     delete user.hashed_pwd;
            res.send({ success: true, user: user });
                
            //     res.send({ success: true, user: user });
            // });
            
            
        });
    });

    auth(req, res, next);
};

exports.requiresApiLogin = function (req, res, next) {
    if (!req.isAuthenticated()) {
        res.status(403);
        res.end();
    } else {
        next();
    }
};

exports.requiresRole = function (role) {
    return function (req, res, next) {
        if (!req.isAuthenticated() || req.user.roles.indexOf(role) === -1) {
            res.status(403);
            res.end();
        } else {
            next();
        }
    };
};

exports.isActivityAuthorized = function (activity) {
    return function (req, res, next) {
        // console.log('the activity::: ' + activity);
        // console.log('isauth?' + req.isAuthenticated());
        // console.log('is author?:::' + rolesRepository.isAuthorized(req.user.roles, activity));
        if (!req.isAuthenticated() || !rolesRepository.isAuthorized(req.user.roles, activity)) {
            res.status(403);
            res.end();
        } else {
            next();
        }

    };
};