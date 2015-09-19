var mongoose = require('mongoose');
var schema = require('./rentalItem_schema');
var Q = require('q');

var RentalItem = mongoose.model('RentalItem', schema.rentalItemSchema);

function createDefaultRentalItems(companyId) {
    var dfd = Q.defer();
    
    var items = [];
    RentalItem.find({}).exec(function (err, collection) {
        
        if (collection.length === 0) {
            var rentalItem1 = {meta: {company: companyId}, name: "Projector", price: 100, inHouse: true};
            var rentalItem2 = {meta: {company: companyId}, name: "Kegorator", price: 150, inHouse: true, contact: {firstName: "Arry", lastName: "Smith", phone: 7502434113, email: "ajSmith@Gmail.com"}};
            
            RentalItem.create(rentalItem1, rentalItem2, function (err, item1, item2) {

                if (err) {
                    dfd.reject(new Error(err));
                }
                items.push(item1);
                items.push(item2);
                //items.push(item1._id);
                //.push(item2._id);
                console.log('2 succesfully created rentalitem documents.....');
                //console.log(JSON.stringify(items));
                dfd.resolve(items);
                
            });
            
            
           
        }
        
    });
    
    return dfd.promise;
    
}

exports.createDefaultRentalItems = createDefaultRentalItems;