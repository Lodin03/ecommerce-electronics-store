var express = require('express');
var router = express.Router();
const isAdmin = require('../middleware/adminCheck')
const categoryController = require('../controllers/categoryController')

router.get('/', categoryController.getCategories);
router.post('/', isAdmin, categoryController.createNewCategory);
router.put('/:id', isAdmin, categoryController.updateCategory);
router.delete('/:id', isAdmin, categoryController.deleteCategory);

module.exports = router