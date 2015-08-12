var MenuGroup = require('mongoose').model('MenuGroup');

exports.getMenuGroups = function (req,res) {
    MenuGroup.find({company: req.user.company}).exec(
        function (err, collection) {
            res.send(collection);
        });
    
};
exports.getMenuGroupById = function (req,res) {
    MenuGroup.findOne({ _id: req.params.id, company: req.user.company})
    .exec(function(err, menuGroup){
        res.send(menuGroup);
    });
};
exports.createMenuGroup = function (req,res) {
    var menuGroupData = req.body;
    menuGroupData.company = req.user.company;
    MenuGroup.create(menuGroupData, function (err, menuGroup){
        if (err) {
            res.sendStatus(400);
            return res.sent({reason: err.toString()});
        }
        res.send(menuGroup.toObject());
    });
};
exports.updateMenuGroup = function (req,res) {
    res.send('not implemented');};
exports.deleteMenuGroup = function (req,res) {
    res.send('not implemented');};