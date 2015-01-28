var MenuItem = require('mongoose').model('MenuItem');

exports.getMenuItems = function (req, res) {
    MenuItem.find({ company: req.user.company }).exec(function (err, collection) {

        res.send(collection);
    });


};

exports.getMenuItemById = function (req, res) {

    MenuItem.findOne({ _id: req.params.id, company: req.user.company }).exec(function (err, menuitem) {
        res.send(menuitem);
    });

};