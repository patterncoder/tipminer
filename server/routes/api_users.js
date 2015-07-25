var express = require('express');
var router = express.Router();
var auth = require('../config/auth');
var controller = require('../controllers/users');


//router.get('/', auth.requiresRole('admin'), controller.getUsers);
// Base Route /api/users
router.get('/', auth.isActivityAuthorized('GET /api/users'), controller.getUsers);
router.post('/', auth.isActivityAuthorized('POST /api/users'), controller.createUser);
router.put('/', auth.isActivityAuthorized('PUT /api/users'), controller.updateUser);

module.exports = router;