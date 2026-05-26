var express = require('express');
var router = express.Router();
const isAdmin = require('../middleware/adminCheck')
const productController = require('../controllers/productController')

router.get('/', productController.getProducts);

module.exports = router