var express = require('express');
var controller = require('../controllers/venues.js');

var router = express.Router();
router.get('/', controller.getVenues);
router.get('/:id', controller.getVenueById);
router.delete('/:id', controller.deleteVenue);
router.put('/:id', controller.updateVenue);
router.post('/', controller.createVenue);


module.exports = router;