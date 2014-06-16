var Customer = require('mongoose').model('Customer');

exports.getCustomers = function (req, res) {
    Customer.find({}).exec(function (err, collection) {
        //var index;
        //for (index = 0; index < collection.length; ++index) {
        //    collection[index].mylink = "hello";
        //    console.log(collection[index]);
            
        //}
        
        var newCollection = new Array();
        collection.map(function (item) {
            var newItem = item.toObject();
            newItem['field'] = 'hello2';
            console.log(newItem['field']);
            newCollection.push(newItem);
            console.log(newItem);
        });
        console.log(newCollection);
        res.send(newCollection);
    });
}

exports.getCustomerById = function (req, res) {
    Customer.findOne({ _id: req.parames.id }).exec(function (err, customer) {
        res.send(customer);
    });
}

exports.createCustomer = function (req, res, next) {
    var customerData = req.body;
    Customer.create(customerData, function (err, customer) {
        console.log("I am here.");
        if (err) {
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(customer);
    });

}