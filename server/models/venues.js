var mongoose = require('mongoose');
var schema = require('./venues_schema');
var Q = require('q');

var venues = mongoose.model('venues', schema.venuesSchema);

function createDefaultVenues(companyId) {
    var dfd = Q.defer();
    
    var items = [];
    venues.find({}).exec(function (err, collection) {
        
        if (collection.length === 0) {
            var venueItem1 = {meta: {company: companyId}, name: "Rotunda", price: 5000, description: "Main Round Dining Room", capacity: 40, notes: "Do not book on weekend nights"};
            var venueItem2 = {meta: {company: companyId}, name: "South Dining Room", price: 3000, description: "Small side dining room", capacity: 20, notes: "None"};
            
            venues.create(venueItem1, venueItem2, function (err, item1, item2) {

                if (err) {
                    dfd.reject(new Error(err));
                }
                items.push(item1);
                items.push(item2);
                //items.push(item1._id);
                //.push(item2._id);
                console.log('2 succesfully created venues .....');
                //console.log(JSON.stringify(items));
                dfd.resolve(items);
                
            });
            
            
           
        }
        
    });
    
    return dfd.promise;
    
}

exports.createDefaultVenues = createDefaultVenues;