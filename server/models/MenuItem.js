var mongoose = require('mongoose');
var Q = require('q');


var menuItemSchema = mongoose.Schema({
    name: String,
    description: String,
    category: String,
    variations: [{name:String,description:String}],

});

var MenuItem = mongoose.model('MenuItem', menuItemSchema);

function createDefaultMenuItems() {
    var dfd = Q.defer();
    var items = [];
    MenuItem.find({}).exec(function (err, collection) {
        
        if (collection.length === 0) {
            var menuItem1 = { name: 'Caesar Salad', description: 'Crisp romaine lettuce tossed with Caesar dressing, croutons and asiago cheese', category: 'Salad' };
            var menuItem2 = { name: 'House Salad', description: 'Mixed greens tossed with raspberry vinaigrette and toasted almonds', category: 'Salad' };
            
            MenuItem.create(menuItem1, menuItem2, function (err, item1, item2) {
                if (err) {
                    dfd.reject(new Error(err));
                }
                items.push(item1._id);
                items.push(item2._id);
                dfd.resolve(items);
            });
            
            
           
        }
        
    });
    console.log('created all seed documents...');
    return dfd.promise;
    
}

exports.createDefaultMenuItems = createDefaultMenuItems;