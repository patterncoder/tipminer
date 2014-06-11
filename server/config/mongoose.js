var mongoose = require('mongoose'),
    userModel = require('../models/User'),
    contractModel = require('../models/Contract'),
    bidModel = require('../models/Bid');

module.exports = function (config) {

    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open',function callback(){
        console.log('tipminer db opened');
    });

    userModel.createDefaultUsers();
    contractModel.createDefaultContracts();



};

