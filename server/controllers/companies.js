var Company = require('mongoose').model('Company');

exports.createCompany = function (req, res, next) {
    var companyData = req.body;
    Company.create(companyData, function (err, company) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Company Name');
            }
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(company);
    });
};