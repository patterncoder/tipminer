var Company = require('mongoose').model('Company');
var usersCtrl = require('./users');

exports.getCompanies = function (req, res, next) {
    res.send('not implemented');
};

exports.createCompany = function (req, res, next) {
    
    var newCompany = new Company({
                companyName: req.body.companyName,
                emails: [{emailType: "AccountCreator", primary: true, email: req.body.username}]
            }
        );
    newCompany.save(function (err) {
        if (err) { console.log(err); }
        console.log("in companies.createCompany new doc id is " + newCompany._id);
        req.body.company = newCompany._id;
        
        usersCtrl.createUser(req, res, next);
    });

    // Create company with non-duplicate name and return the _id of the document
    // Create an admin user account with the company id returned
    //Company.create(newAccountName, function (err, company) {
    //    if (err) {
    //        if (err.toString().indexOf('E11000') > -1) {
    //            err = new Error('Duplicate Company Name');
    //        }
    //        res.status(400);
    //        return res.send({ reason: err.toString() });
    //    }
    //    res.send(company);
    //});
};

exports.getCompanyById = function (req, res) {
    Company.findOne({ _id: req.params.id }).exec(function (err, company) {
        res.send(company);
    });
};

exports.getCompanies = function (req, res) {
    Company.find({}).lean().exec(function (err, collection) {
        res.send(collection);
    });
};

exports.updateCompany = function (req, res) {
    //mongoose does't like the _id in the req.body...causes error
    delete req.body._id;
    Company.findByIdAndUpdate({ _id: req.params.id }, req.body, function (err, company) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Company');
            }
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(company);
    });

};