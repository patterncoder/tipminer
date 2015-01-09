var Contract = require('mongoose').model('Contract');

exports.getContracts = function (req, res){
    Contract.find({ company: req.user.company }).exec(function (err, collection) {

        res.send(collection);
    });


};

exports.getContractById = function(req, res){

    Contract.findOne({ _id: req.params.id }).exec(function (err, contract) {
        res.send(contract);
    });

};