var passport = require('passport'),
    auth = require('./auth'),
    users = require('../controllers/users'),
    contracts = require('../controllers/contracts'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');


module.exports = function (app) {
    app.all('*', function(req, res, next){
        var reqHost = req.url;
        var subs = req.subdomains;
        var host = req.host;
        console.log(reqHost);
        console.log(subs);
        console.log(host);
        next();
    });

    app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
    app.post('/api/users', users.createUser);
    app.put('/api/users', users.updateUser);

    app.get('/api/contracts', contracts.getContracts);
    app.get('/api/contracts/:id', contracts.getContractById);

    app.get('/partials/*', function(req,res){
        res.render('../../public/app/' + req.params);
    });



    app.post('/login', auth.authenticate);

    app.post('/logout', function(req, res){
        req.logout();
        res.end();
    });

    app.all('/api/*', function(req, res){
        res.send(404);
    });

    app.get('*',function(req, res){
        res.render('index', {
            bootstrappedUser: req.user
        });
    });

};