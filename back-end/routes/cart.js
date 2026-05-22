var express = require('express');
var router = express.Router();
const cartController = require('../controllers/cartController')

router.post('/', cartController.addToCart)
router.get('/', cartController.getCart);
router.post('/checkout/now', cartController.checkout);

module.exports = router;
