var Lookups = require('mongoose').model('Lookups');

exports.getLookups = function (req, res) {
    
    Lookups.find({ company: req.user.company }).exec(function (err, collection) {
        res.send(collection);
    });
};
exports.getLookupsById = function (req, res) {
    res.sendStatus(501);
};
exports.deleteLookups = function (req, res) {
    res.sendStatus(501);
};
exports.updateLookups = function (req, res) {
    res.sendStatus(501);
};
exports.createLookups = function (req, res) {
    res.sendStatus(501);
};

