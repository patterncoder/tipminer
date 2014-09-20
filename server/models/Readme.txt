Set up a model



var mongoose = require('mongoose');

var modelNameSchema = mongoose.Schema({});

var ModelName = mongoose.model('ModelName', modelNameSchema);

function createDefaultModels(){};

exports.createDefaultModels = createDefaultModels;