var express = require('express');
var router = express.Router();
var auth = require('../config/auth');
var controller = require('../controllers/customers');



// Base Route /api/customers
router.put('/:id', controller.updateCustomer);
router.delete('/:id', controller.deleteCustomer);
router.get('/', auth.isActivityAuthorized('GET /api/customers'), controller.getCustomers);
router.get('/:id', controller.getCustomerById);
router.post('/', controller.createCustomer);

module.exports = router;