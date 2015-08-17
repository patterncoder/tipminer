var mongoose = require('mongoose');

var IngredientSchema = mongoose.Schema({
    meta: {
        dateCreated: { type: Date, default: Date.now }
    },
    company: {type:mongoose.Schema.Types.ObjectId, ref:'Company'},
    name: {
        type: String
    },
    infoFacts: {
        
    },
    nutrition: {
        
    },
    purchaseUnits: [{
        
    }],
    
});