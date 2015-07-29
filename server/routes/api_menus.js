var express = require('express');
var router = express.Router();
var controller = require('../controllers/menus');


router.get('/', controller.getMenus);
router.get('/:id', controller.getMenuById);
router.post('/', controller.createMenu);
router.put('/:id', controller.updateMenu);
router.delete('/:id', controller.deleteMenu);



module.exports = router;