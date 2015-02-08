var mongoose = require('mongoose');
var Q = require('q');

var lookupsSchema = mongoose.Schema({
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    menuItemTags: [String],
    contactTags: [String]


});

var Lookups = mongoose.model('Lookups', lookupsSchema);

function createDefaultLookups(companyId) {
    var dfd = Q.defer();
    
    Lookups.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            var lookup = {
                company: companyId,
                menuItemTags: ['Appetizer', 'Soup', 'Salad', 'Entree', 'Dessert'],
                contactTags: ['Home','Cell','Work']
            };
            Lookups.create(lookup, function (err, item1) {
                if (err) {
                    dfd.reject(new Error(err));
                }
                console.log('xx successfully created lookup document.....');
                dfd.resolve();
            });
        }
    }

        );

    return dfd.promise;
}

exports.createDefaultLookups = createDefaultLookups;