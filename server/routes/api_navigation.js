var express = require('express');
var router = express.Router();
var controller = require('../controllers/navigation');


router.get('/', controller.getNavigation);
//router.post('/api/navigation', controller.createNavigation);

module.exports = router;