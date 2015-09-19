var RentalItem = require('mongoose').model('RentalItem');

exports.getRentalItems = function (req, res) {
    RentalItem.find({ "meta.company": req.user.company}).exec(function (err, collection) {
        if(err){
            res.status(400);
        }
        res.send(collection);
    });


};

exports.getRentalItemById = function (req, res) {

    RentalItem.findOne({ _id: req.params.id, company: req.user.company }).exec(function (err, rentalitem) {
        res.send(rentalitem);
    });

};

exports.createRentalItem = function (req, res, next) {
    var rentalItemData = req.body;
    rentalItemData.company = req.user.company;
    RentalItem.create(rentalItemData, function (err, rentalItem) {
        if (err) {
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(rentalItem.toObject());
    });
};

exports.updateRentalItem = function (req, res) {
    delete req.body._id;
    
    RentalItem.findByIdAndUpdate({ _id: req.params.id }, req.body, function (err, rentalItem) {
        if (err) {
            console.log(err);
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(rentalItem.toObject());
    });
};

exports.deleteRentalItem = function (req, res) {
    RentalItem.remove({ _id: req.params.id }, function (err) {
        if (err) {
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(204);
    });
};