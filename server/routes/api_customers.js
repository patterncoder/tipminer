var express = require('express');
var router = express.Router();
var auth = require('../config/auth');
var controller = require('../controllers/customers');



// Base Route /api/customers
router.put('/:id', auth.isActivityAuthorized('PUT /api/customers'), controller.updateCustomer);
router.delete('/:id', auth.isActivityAuthorized('DELETE /api/customers'), controller.deleteCustomer);
router.get('/', auth.isActivityAuthorized('GET /api/customers'), controller.getCustomers);
router.get('/:id', auth.isActivityAuthorized('GET /api/customers'), controller.getCustomerById);
router.post('/', auth.isActivityAuthorized('POST /api/customers'), controller.createCustomer);

module.exports = router;