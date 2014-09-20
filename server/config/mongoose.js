// here is where mongoose gets the models wired up
var mongoose = require('mongoose'),
    userModel = require('../models/User'),
    contractModel = require('../models/Contract'),
    companyModel = require('../models/Company'),
    customerModel = require('../models/Customer'),
    bidModel = require('../models/Bid'),
    navigationModel = require('../models/Navigation');

module.exports = function (config) {

    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open',function callback(){
        console.log('tipminer db opened');
    });

    //create the mock data here.
    userModel.createDefaultUsers();
    contractModel.createDefaultContracts();
    customerModel.createDefaultCustomers();
    navigationModel.createDefaultNavigation();




};

