var MenuGroup = require('mongoose').model('MenuGroup');

exports.getMenuGroups = function (req,res) {
    MenuGroup.find({company: req.user.company}).exec(
        function (err, collection) {
            res.send(collection);
        });
    
};
exports.getMenuGroupById = function (req,res) {
    res.send('not implemented');};
exports.createMenuGroup = function (req,res) {
    res.send('not implemented');};
exports.updateMenuGroup = function (req,res) {
    res.send('not implemented');};
exports.deleteMenuGroup = function (req,res) {
    res.send('not implemented');};