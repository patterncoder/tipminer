﻿var express = require('express');
var router = express.Router();
var controller = require('../controllers/menus');


router.get('/', controller.getMenus);
//router.post('/api/navigation', controller.createNavigation);

module.exports = router;