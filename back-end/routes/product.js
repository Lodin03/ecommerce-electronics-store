var express = require('express');
var router = express.Router();
const isAdmin = require('../middleware/adminCheck')
const productController = require('../controllers/productController')

router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.post('/', isAdmin, productController.newProduct);
router.put('/:id', isAdmin, productController.updateProduct);
router.delete('/:id', isAdmin, productController.softDeleteProduct);

module.exports = router