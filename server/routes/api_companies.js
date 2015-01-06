var express = require('express');
var router = express.Router();
var auth = require('../config/auth');
var controller = require('../controllers/companies');



// Base Route /api/companies
router.get('/', controller.getCompanies);
router.get('/:id', controller.getCompanyById);
// post request creates a new company and new admin user account
router.post('/', controller.createCompany);
router.get('/', controller.getCompanies);

module.exports = router;