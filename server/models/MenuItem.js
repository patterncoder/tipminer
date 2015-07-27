var mongoose = require('mongoose');
var Q = require('q');


var menuItemSchema = mongoose.Schema({
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    name: String,
    description: String,
    category: String,
    variations: [{name:String,description:String}],

});

var MenuItem = mongoose.model('MenuItem', menuItemSchema);

function createDefaultMenuItems(companyId) {
    var dfd = Q.defer();
    
    var items = [];
    MenuItem.find({}).exec(function (err, collection) {
        
        if (collection.length === 0) {
            var menuItem1 = {company: companyId, name: 'Caesar Salad', description: 'Crisp romaine lettuce tossed with Caesar dressing, croutons and asiago cheese', category: 'Salad' };
            var menuItem2 = { company: companyId, name: 'House Salad', description: 'Mixed greens tossed with raspberry vinaigrette and toasted almonds', category: 'Salad' };
            
            MenuItem.create(menuItem1, menuItem2, function (err, item1, item2) {
                if (err) {
                    dfd.reject(new Error(err));
                }
                items.push(item1);
                items.push(item2);
                //items.push(item1._id);
                //.push(item2._id);
                console.log('30 succesfully created menuitem documents.....');
                //console.log(JSON.stringify(items));
                dfd.resolve(items);
                
            });
            
            
           
        }
        
    });
    
    return dfd.promise;
    
}

exports.createDefaultMenuItems = createDefaultMenuItems;