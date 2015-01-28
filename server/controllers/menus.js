var Menu = require('mongoose').model('Menu');

exports.getMenus = function (req, res) {
    Menu.find({ company: req.user.company }).exec(function (err, collection) {

        res.send(collection);
    });


};

exports.getMenuById = function (req, res) {

    Menu.findOne({ _id: req.params.id, company: req.user.company }).exec(function (err, menu) {
        res.send(menu);
    });

};