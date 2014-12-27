var passport = require('passport'),
    auth = require('./auth'),
    //navigationRoutes = require('../routes/navigation'),
    users = require('../controllers/users'),
    contracts = require('../controllers/contracts'),
    navigation = require('../controllers/navigation'),
    customers = require('../controllers/customers'),
    companies = require('../controllers/companies'),
    bids = require('../controllers/bids'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

var express = require('express');
var router = express.Router();


module.exports = function (app) {

    //Below here was trying to make subdomains work.  Can't figure out how to spoof subdomains.
    //app.all('*', function (req, res, next) {
    //    var reqHost = req.url;
    //    var subs = req.subdomains;
    //    var host = req.host;
    //    console.log(reqHost);
    //    console.log(subs);
    //    console.log(host);
    //    next();
    //});
    //app.use('/api/navigation', navigationRoutes);
    app.get('/api/navigation', navigation.getNavigation);
    //app.post('/api/navigation', navigation.createNavigation);
    app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
    // Company
    //app.post('/api/companies', companies.createCompany);
    // Users
    app.get('/api/users', auth.isActivityAuthorized('GET /api/users'), users.getUsers);
    app.post('/api/users', users.createUser);
    app.put('/api/users', users.updateUser);
    // Contracts
    app.get('/api/contracts', contracts.getContracts);
    app.get('/api/contracts/:id', contracts.getContractById);
    // Customers
    app.put('/api/customers/:id', customers.updateCustomer);
    app.delete('/api/customers/:id', customers.deleteCustomer);
    app.get('/api/customers', auth.isActivityAuthorized('GET /api/customers'), customers.getCustomers);
    app.get('/api/customers/:id', customers.getCustomerById);
    app.post('/api/customers', customers.createCustomer);
    // Bids
    app.get('/api/bids', bids.getBids);
    app.get('/api/bids/:id', bids.getBidById);
    // Partials
    app.get('/partials/*', function (req, res) {
        res.render('../../public/app/' + req.params[0]);
    });
    // Login and Logout
    app.post('/login', auth.authenticate);
    // on logout passport removes req.user so that it is undefined in the response thus manking front end "logged out"
    app.post('/logout', function (req, res) { req.logout(); res.end(); });
    // API
    // any undefined api route returns 404
    app.all('/api/*', function (req, res) { res.send(404); });
    // bootstrappedUser gets added on page refreshes if the user is logged in otherwise it is undefined.
    app.get('*', function (req, res) { res.render('index', { bootstrappedUser: req.user });});
    //app.get('/', function (req, res) {
        //res.send('hello');
    //});

};