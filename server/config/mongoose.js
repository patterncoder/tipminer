// here is where mongoose gets the models wired up
var Q = require('q');
var mongoose = require('mongoose'),
    userModel = require('../models/User'),
    contractModel = require('../models/Contract'),
    companyModel = require('../models/Company'),
    customerModel = require('../models/Customer'),
    bidModel = require('../models/Bid'),
    navigationModel = require('../models/Navigation'),
    menuItemModel = require('../models/MenuItem'),
    menuModel = require('../models/Menu'),
    lookupsModel = require('../models/Lookups');

module.exports = function (config) {

    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('tipminer db opened');
    });

    //create the mock data here.
    var seedCompanyId;

    // companyModel.createDefaultCompany()
    //     .then(function(companyId) {
    //         seedCompanyId = companyId;
    //         return userModel.createDefaultUsers(companyId)
    //     })
    //     .then(menuItemModel.createDefaultMenuItems(seedCompanyId))
    //     .then(function(seedCompanyId, items){
    //         return menuModel.createDefaultMenu(seedCompanyId, items)
    //     })
    //     .then(contractModel.createDefaultContracts(seedCompanyId))
    //     .then(contractModel.createDefaultContracts(seedCompanyId))
    //     .then(navigationModel.createDefaultNavigation())
    //     .then(lookupsModel.createDefaultLookups(seedCompanyId));
        
        
    companyModel.createDefaultCompany()
    .then(function (companyId) {
        seedCompanyId = companyId;
        userModel.createDefaultUsers(companyId)
                .then(menuItemModel.createDefaultMenuItems(seedCompanyId)
                .then(function (items) {
                    menuModel.createDefaultMenu(seedCompanyId, items);
                })
                .then(contractModel.createDefaultContracts(seedCompanyId))
                .then(customerModel.createDefaultCustomers(seedCompanyId))
                .then(navigationModel.createDefaultNavigation())
                .then(lookupsModel.createDefaultLookups(seedCompanyId))

                );


   });

};
   
    
    
    
    
    




