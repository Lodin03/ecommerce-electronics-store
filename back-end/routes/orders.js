var express = require('express');
var router = express.Router();
const ordersController = require('../controllers/ordersController');
const isAdmin = require('../middleware/adminCheck');

router.get('/', ordersController.getOrders);
router.get('/:id', ordersController.getOrderById);
router.put('/:id/status', isAdmin, ordersController.updateOrderStatus);

module.exports = router