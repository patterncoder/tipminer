var Menu = require('mongoose').model('Menu');

exports.getMenus = function (req, res) {
    
    var select = req.query.select || '_id title';
    
    Menu.find({ company: req.user.company },select).exec(function (err, collection) {
        collection.foreach()
        res.send(collection);
    });


};

exports.getMenuById = function (req, res) {

    Menu.findOne({ _id: req.params.id, company: req.user.company }).exec(function (err, menu) {
        res.send(menu);
    });

};

exports.createMenu = function (req, res){
    res.send('not implemented');
};
exports.updateMenu = function (req, res){
    res.send('not implemented');
};
exports.deleteMenu = function (req, res){
    res.send('not implemented');
};
exports.cloneMenu = function (req, res){
    res.send('not implemented');
};
