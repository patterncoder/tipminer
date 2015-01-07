var MenuItem = require('mongoose').model('MenuItem');

exports.getMenuItems = function (req, res) {
    MenuItem.find({}).exec(function (err, collection) {

        res.send(collection);
    });


};

exports.getMenuItemById = function (req, res) {

    MenuItem.findOne({ _id: req.params.id }).exec(function (err, menuitem) {
        res.send(menuitem);
    });

};