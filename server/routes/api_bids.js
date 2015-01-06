var express = require('express');
var router = express.Router();
var auth = require('../config/auth');
var controller = require('../controllers/bids');



// Base Route /api/bids

router.post('/', controller.createBid);
router.get('/', controller.getBids);
router.get('/:id', controller.getBidById);

module.exports = router;