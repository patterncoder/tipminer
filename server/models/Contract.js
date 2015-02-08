var mongoose = require('mongoose');
var Q = require('q');

var contractSchema = mongoose.Schema({
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    name: {type:String, required:'{PATH} is required!'},
    date: {type:Date, required:'{PATH} is required!'},
    contract: {type:Boolean, required:'{PATH} is required!'},
    nature: {type:String, required:'{PATH} is required!'},
    tags: [String]
});

var Contract = mongoose.model('Contract', contractSchema);

function createDefaultContracts(companyId) {

    var dfd = Q.defer();

    Contract.find({}).exec(function (err, collection) {

        if (collection.length === 0) {
            var contracts = [

             { company: companyId, name: 'Johnson Party', date: '11/6/1969', contract: true, nature: 'Plated Dinner', tags: ['nice customer', 'repeat visit'] },
             { company: companyId, name: 'Smith Party', date: '12/6/1968', contract: true, nature: 'Plated Dinner', tags: ['nice customer', 'repeat visit'] },
             { company: companyId, name: 'Baily Party', date: '1/6/1967', contract: true, nature: 'Plated Dinner', tags: ['nice customer', 'repeat visit'] },
            { company: companyId, name: 'Nolan Party', date: '2/6/1965', contract: true, nature: 'Plated Dinner', tags: ['nice customer', 'repeat visit'] },
            { company: companyId, name: 'Clark Party', date: '3/6/1965', contract: true, nature: 'Plated Dinner', tags: ['nice customer', 'aaa'] },
            { company: companyId, name: 'Carter Party', date: '4/6/1965', contract: true, nature: 'Plated Dinner', tags: ['nice customer', 'repeat visit'] },
            { company: companyId, name: 'Reagan Party', date: '5/6/1964', contract: true, nature: 'Plated Dinner', tags: ['nice customer', 'repeat visit'] },
            { company: companyId, name: 'Roberts Party', date: '6/6/1963', contract: true, nature: 'Plated Dinner', tags: ['ccc', 'repeat visit'] },
            { company: companyId, name: 'Nixon Party', date: '7/6/1962', contract: true, nature: 'Plated Dinner', tags: ['nice customer', 'repeat visit'] },
            { company: companyId, name: 'Clinton Party', date: '8/6/1961', contract: true, nature: 'Plated Dinner', tags: ['nice customer', 'repeat visit'] },
            { company: companyId, name: 'Bush Party', date: '9/6/1961', contract: true, nature: 'Plated Dinner', tags: ['xhr', 'repeat visit'] },
            { company: companyId, name: 'Obama Party', date: '10/6/1961', contract: true, nature: 'Plated Dinner', tags: ['nice customer', 'repeat visit'] },
            { company: companyId, name: 'Limbaugh Party', date: '11/6/1961', contract: true, nature: 'Plated Dinner', tags: ['nice customer', 'repeat visit'] },
            { company: companyId, name: 'Washington Party', date: '12/6/1961', contract: true, nature: 'Plated Dinner', tags: ['nice customer', 'xhr'] }];
            
            console.log('30 successfully created contract documents....');

            Contract.create(contracts, function () {
                
                dfd.resolve();
            });


            
            
        }
    });

    return dfd.promise;
}

exports.createDefaultContracts = createDefaultContracts;