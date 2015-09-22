var express = require('express');
var controller = require('../controllers/rentalItems');

var router = express.Router();
router.get('/', controller.getRentalItems);
router.get('/:id', controller.getRentalItemById);
router.delete('/:id', controller.deleteRentalItem);
router.put('/:id', controller.updateRentalItem);
router.post('/', controller.createRentalItem);


module.exports = router;