var express = require('express');
var router = express.Router();
var controller = require('../controllers/menugroups');


router.get('/', controller.getMenuGroups);
router.get('/:id', controller.getMenuGroupById);
router.post('/', controller.createMenuGroup);
router.put('/:id', controller.updateMenuGroup);
router.delete('/:id', controller.deleteMenuGroup);



module.exports = router;