var express = require('express');
var router = express.Router();
var controller = require('../controllers/menuItems');


router.get('/', controller.getMenuItems);
//router.post('/api/navigation', controller.createNavigation);

module.exports = router;