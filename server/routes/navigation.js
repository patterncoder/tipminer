var express = require('express');
var router = express.Router();
var controller = require('../controllers/navigation');


router.get('/api/navigation', controller.getNavigation);
//router.post('/api/navigation', controller.createNavigation);