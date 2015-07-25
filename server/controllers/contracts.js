var Contract = require('mongoose').model('Contract');

exports.getContracts = function (req, res){
    if ('user' in req)
    {
        Contract.find({ company: req.user.company }).exec(function (err, collection) {
        
        res.send(collection);
        });
    }
    else
    {
        res.send(403);
    }
    


};

exports.getContractById = function(req, res){

    Contract.findOne({ _id: req.params.id,company: req.user.company }).exec(function (err, contract) {
        res.send(contract);
    });

};