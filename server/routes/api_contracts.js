var express = require('express');
var router = express.Router();
var auth = require('../config/auth');
var controller = require('../controllers/contracts');



// Base Route /api/contracts
router.get('/', controller.getContracts);
router.get('/:id', controller.getContractById);

module.exports = router;