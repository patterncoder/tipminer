var mongoose = require('mongoose');


exports.getSimpleSchema = function (schema) {
    var simpleSchema = {};
    
    function extractSchema () {
        if(schema.hasOwnProperty('schema')) {
            simpleSchema.path = schema.path;
            simpleSchema.isSchema = true;
            simpleSchema.paths = [];
            for(var prop in schema.schema.paths) {
                //console.log(prop + '  ' + schema.schema.paths[prop]);
                var subSchema = {};
                subSchema.key = schema.schema.paths[prop].path;
                subSchema.validators = schema.schema.paths[prop].validators;
                simpleSchema.paths.push(subSchema);
            }
        }
        
        simpleSchema.key = schema.path;
        simpleSchema.validators = schema.validators;
        return simpleSchema;
    }
    
    extractSchema();
    
    
    
    // var simpleSchema = buildUp || {};
    // depth = depth || 0;
    // 
    // // if prop .schema exists the call recursively on paths
    // if() {
    //     simpleSchema.key = path;
    //     // // return simpleSchema;
    //     // for(var prop in schema.schema.paths) {
    //     //     getSimpleSchema(prop,schema.schema.paths[prop], simpleSchema, depth);
    //     // }
    //     // depth++;
    //     return simpleSchema;
    //     //return {thisIsASchema: true}
    // };
    // simpleSchema.key = schema.path;
    // simpleSchema.validators = schema.validators;
    // //simpleSchema.options = schema.options;
    // //simpleSchema.isRequired = schema.isRequired;
    // // for (var key in schema) {
    // //     if (yourobject.hasOwnProperty(key)) {
    // //         console.log(key, yourobject[key]);
    // //     }
    // // }
    
    
    return simpleSchema;
};