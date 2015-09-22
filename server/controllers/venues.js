var venues = require('mongoose').model('venues');

exports.getVenues = function (req, res) {
    venues.find({ "meta.company": req.user.company}).exec(function (err, collection) {
        if(err){
            res.status(400);
        }
        res.send(collection);
    });


};

exports.getVenueById = function (req, res) {

    venues.findOne({ _id: req.params.id, "meta.company": req.user.company }).exec(function (err, venue) {
        if(err){
            res.status(400);
        }
        res.send(venue);
    });

};

exports.createVenue = function (req, res, next) {
    var venueData = req.body;
    venueData.meta.company = req.user.company;
    venues.create(venueData, function (err, venue) {
        if (err) {
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(venue.toObject());
    });
};

exports.updateVenue = function (req, res) {
    delete req.body._id;
    
    venues.findByIdAndUpdate({ _id: req.params.id }, req.body, function (err, venue) {
        if (err) {
            console.log(err);
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(venue.toObject());
    });
};

exports.deleteVenue = function (req, res) {
    venues.remove({ _id: req.params.id }, function (err) {
        if (err) {
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(204);
    });
};