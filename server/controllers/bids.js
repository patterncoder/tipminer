var Bid = require('mongoose').model('Bid');

exports.getBids = function (req, res){
    Bid.find({}).exec(function(err, collection){

        res.send(collection);
    });


};

exports.createBid = function (req, res) {
    res.send('not implemented');
};

exports.getBidById = function(req, res){

    Bid.findOne({ _id: req.params.id }).exec(function (err, bid) {
        res.send(bid);
    });

};