var express = require('express');
var controller = require('../controllers/menuItems');

var router = express.Router();
router.get('/', controller.getMenuItems);
router.get('/:id', controller.getMenuItemById);
router.delete('/:id', controller.deleteMenuItem);
router.put('/:id', controller.updateMenuItem);
router.post('/', controller.createMenuItem);


module.exports = router;