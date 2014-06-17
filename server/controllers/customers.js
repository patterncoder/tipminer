var Customer = require('mongoose').model('Customer');

exports.getCustomers = function (req, res) {
    Customer.find({}).lean().exec(function (err, collection) {
       
        console.log(req.method + " " + req.route.path);
        
        collection = collection.map(function (customer) {
            customer['newItem'] = "hope this works";
            
            customer['emails'].map(function (email) {
                email['newEmail'] = "hope this works too" + email["_id"];
                return email
            });

            return customer;
        });

        res.send(collection);
        
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