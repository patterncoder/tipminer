var mongoose = require('mongoose');
var Q = require('q');
var schema = require('./contract_schema');



var Contract = mongoose.model('Contract', schema.contractSchema);

function createDefaultContracts(companyId) {

    var dfd = Q.defer();

    Contract.find({}).exec(function (err, collection) {

        if (collection.length === 0) {
            var contracts = [

             { meta: [{company: companyId, dateLastMod: new Date }], name: 'Johnson Party', date: '11/6/1969', contract: true, nature: 'Plated Dinner', tags: ['nice customer', 'repeat visit'] },
             { meta: [{company: companyId, dateLastMod: new Date }], name: 'Smith Party', date: '12/6/1968', contract: true, nature: 'Plated Dinner', tags: ['nice customer', 'repeat visit'] },
             { meta: [{company: companyId, dateLastMod: new Date }], name: 'Baily Party', date: '1/6/1967', contract: true, nature: 'Plated Dinner', tags: ['nice customer', 'repeat visit'] },
            ];
            
            console.log('30 successfully created contract documents....');

            Contract.create(contracts, function () {
                
                dfd.resolve();
            });


            
            
        }
    });

    return dfd.promise;
}

exports.createDefaultContracts = createDefaultContracts;