var passport = require('passport');
var rolesRepository = require('./rolesRepository');

exports.authenticate = function(req, res, next){
    req.body.username = req.body.username.toLowerCase();
    var auth = passport.authenticate('local', function(err, user){
        if(err){
            console.log("authenticate didn't work");
            return next(err);}
        if(!user){
            console.log("authenticate worked but couldn't match user");
            res.send({success:false})}

        req.logIn(user, function(err){
        console.log("authenticate worked");
        if(err){
            return next(err);
        }
        res.send({success:true, user: user})
        })
    })
    auth(req, res, next);
}

exports.requiresApiLogin = function(req,res,next){
    if(!req.isAuthenticated()){
        res.status(403);
        res.end();
    } else {
        next();
    }
}

exports.requiresRole = function(role){

    return function(req, res, next){

        if (!req.isAuthenticated() || req.user.roles.indexOf(role) === -1) {
            res.status(403);
            res.end();
        } else {
            next();
        }

    }

}

exports.isActivityAuthorized = function (activity) {

    
    
    return function (req, res, next) {
        
        if (!rolesRepository.isAuthorized(req.user.roles, activity)) {
            res.status(403);
            res.end();
        } else {
            next();
        }
        

    }

}