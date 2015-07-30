var Menu = require('mongoose').model('Menu');

exports.getMenus = function (req, res) {
    var select = req.query.select || '_id title';
    if (req.query.select === "all")
    {
        
        select = "";
        
    }
    
        Menu.find({ company: req.user.company },select).exec(function (err, collection) {
        // should we be stripping data from the response...company ids that could be used for wrong purposes?
        res.send(collection);});
    
    
    


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
    Menu.remove({ _id: req.params.id }, function (err) {
        if (err) {
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(204);
    });
};
exports.cloneMenu = function (req, res){
    res.send('not implemented');
};
