var Customer = require('mongoose').model('Customer');

exports.getCustomers = function (req, res) {

    Customer.find({ company: req.user.company }).lean().exec(function (err, collection) {

        res.send(collection);

    });
};

exports.getCustomerById = function (req, res) {
    Customer.findOne({ _id: req.params.id, company: req.user.company }).exec(function (err, customer) {
        res.send(customer);
    });
};

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

};

exports.updateCustomer = function (req, res) {
    //mongoose does't like the _id in the req.body...causes error
    delete req.body._id;
    Customer.findByIdAndUpdate({_id: req.params.id}, req.body, function (err, customer) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Customer');
            }
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(customer);
    });
    
};

exports.deleteCustomer = function (req, res) {

    Customer.remove({ _id: req.params.id }, function (err) {
        if (err) {
            console.log(err);
        }
        res.send(204);

    });

    
};