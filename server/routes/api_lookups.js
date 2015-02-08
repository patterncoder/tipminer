var express = require('express');
var controller = require('../controllers/lookups');

var router = express.Router();
router.get('/', controller.getLookups);
router.get('/:id', controller.getLookupsById);
router.delete('/:id', controller.deleteLookups);
router.put('/:id', controller.updateLookups);
router.post('/', controller.createLookups);


module.exports = router;