var Contract = require('mongoose').model('Contract');

exports.getContracts = function (req, res){
    Contract.find({}).exec(function(err, collection){

        res.send(collection);
    });
};