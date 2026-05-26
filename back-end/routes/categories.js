var express = require('express');
var router = express.Router();
const isAdmin = require('../middleware/adminCheck')
const categoriesController = require('../controllers/categoriesController')

router.get('/', categoriesController.getCategories);
router.post('/', isAdmin, categoriesController.createNewCategory);
router.put('/:id', isAdmin, categoriesController.updateCategory);
router.delete('/:id', isAdmin, categoriesController.deleteCategory);

module.exports = router