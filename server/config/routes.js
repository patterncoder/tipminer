var auth = require('./auth'),
    companiesController = require('../controllers/companies'),
    navigationRoutes = require('../routes/api_navigation'),
    userRoutes = require('../routes/api_users.js'),
    contractRoutes = require('../routes/api_contracts.js'),
    customerRoutes = require('../routes/api_customers.js'),
    companyRoutes = require('../routes/api_companies.js'),
    bidRoutes = require('../routes/api_bids.js'),
    menuRoutes = require('../routes/api_menus.js'),
    menuItemRoutes = require('../routes/api_menuItems.js'),
    menuGroupRoutes = require('../routes/api_menuGroups.js'),
    lookupsRoutes = require('../routes/api_lookups.js');

    

module.exports = function (app) {
    // defining routes on the passed in express app
    
    // handle the one api route that requires no authentication
    app.post('/api/companies', companiesController.createCompany);
    
    // lockout api without authenticated user.  passport puts a user object
    // on the req object...so if its not there there is no authenticated user
    app.use('/api/*',function(req, res, next){
        if ('user' in req){
            next();
        }
        else {
            res.sendStatus(403);
        }
    });
    //api routes with pointers to custom routers
    app.use('/api/navigation', navigationRoutes);
    app.use('/api/contracts', contractRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/customers', customerRoutes);
    app.use('/api/companies', companyRoutes);
    app.use('/api/bids', bidRoutes);
    app.use('/api/menus', menuRoutes);
    app.use('/api/menuItems', menuItemRoutes);
    app.use('/api/menuGroups', menuGroupRoutes);
    app.use('/api/lookups', lookupsRoutes);
    
    // Partials
    app.get('/partials/*', function (req, res) {
        res.render('../../public/app/' + req.params[0]);
    });

    // Login and Logout
    // the post to /login is where passport adds the req.user to the req object
    app.post('/login', auth.authenticate);
    // on logout passport removes req.user so that it is undefined in the response thus manking front end "logged out"
    app.post('/logout', function (req, res) {
        req.logout();
        res.end();
    });
    // API
    // any undefined api route returns 404
    app.all('/api/*', function (req, res) {
        res.sendStatus(404);
    });
    // bootstrappedUser gets added on page refreshes if the user is logged in otherwise it is undefined.
    app.get('*', function (req, res) {
        res.render('index', { bootstrappedUser: req.user });
    });

};