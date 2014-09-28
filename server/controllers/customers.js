var Customer = require('mongoose').model('Customer');

exports.getCustomers = function (req, res) {

    //res.header("content-type", "text/javascript");
    //console.log("hostName" + req.path + req.get("host"));
    //var hostName = req.protocol + '://' + req.get('host') + req.originalUrl + '/';

    Customer.find({}).lean().exec(function (err, collection) {
       
        
        //console.log(req.method + " " + req.route.path);
        // apply api links based on activity authroization
        // how do we know what activities to apply?
        // based on state machine principles?
        // we successfully get the verb and route path to match the activity repo
        // pass the collection to the apply api links with some 
        // collection level add customer
        // customer level edit delete
        // because the subdocuments are saved at the customer level
        // I don't think we need a bunch of edit delete api links
        // Collection+JSON API
        // 

        //{
        //    "collection" :   
        //    {"version" : "1.0",
        //    "href" : URI,
        //    "links" : [ARRAY],     
        //    "items" : [{"href" : URI,"data" : [ARRAY],"links" : [{"href": URI, "rel":String, "prompt": String, "name":String, "render": "image|link"}]}],
        //    "queries" : [{"href": URI, "rel": String, "prompt":String, data: [{"name": String, "value": String}]}],
        //    "template" : {"data":[{"name": String, "value": String, "prompt": String}],
        //    "error": {"title": String, "code": String, "message": String}
        //    }
        //}
 
        //collection = collection.map(function (customer) {
            //customer['newItem'] = "hope this works";
            
            //customer['emails'].map(function (email) {
                //email['newEmail'] = "hope this works too" + email["_id"];
                //return email
            //});

            //return customer;
        //});

        //res.render('customers', { site: hostName, items: collection })

        res.send(collection);
        
    });
}

exports.getCustomerById = function (req, res) {
    Customer.findOne({ _id: req.params.id }).exec(function (err, customer) {
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

};

exports.updateCustomer = function (req, res) {
    //mongoose does't like the _id in the req.body...causes error
    delete req.body._id;
    Customer.findByIdAndUpdate({_id: req.params.id}, req.body, function (err, customer) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Username');
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

    })

    
};