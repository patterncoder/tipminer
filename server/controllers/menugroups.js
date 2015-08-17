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
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.send(menuGroup.toObject());
    });
};

exports.updateMenuGroup = function (req,res) {
    console.log("got to the updatement unction");
    delete req.body._id;
    MenuGroup.findByIdAndUpdate({ _id: req.params.id }, req.body, function(err, menuGroup){
        if(err){
            console.log(err);
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.send(menuGroup.toObject());
    });
};

exports.deleteMenuGroup = function (req,res) {
    MenuGroup.remove({_id: req.params.id}, function(err){
        if(err){
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.sendStatus(204);
    });
};