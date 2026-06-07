var express = require('express');
var router = express.Router();
const isAdmin = require('../middleware/adminCheck');
const orderController = require('../controllers/orderController');

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders for logged in user
 *     description: Returns all orders belonging to the authenticated user including order items.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 statuscode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     result:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           orderNumber:
 *                             type: string
 *                             example: 6ad4JHid
 *                           status:
 *                             type: string
 *                             example: In Progress
 *                           membershipDiscount:
 *                             type: number
 *                             example: 0
 *       401:
 *         description: No token provided or invalid token
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               data:
 *                 statusCode: 401
 *                 result: No token provided. Access denied.
 *       404:
 *         description: No orders found
 *       500:
 *         description: Failed to get orders
 */
router.get('/', orderController.getOrders);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     description: Returns a specific order with its items. Users can only view their own orders.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 statuscode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     result:
 *                       type: object
 *                       properties:
 *                         order:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 1
 *                             orderNumber:
 *                               type: string
 *                               example: 6ad4JHid
 *                             status:
 *                               type: string
 *                               example: In Progress
 *                         orderItems:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               productId:
 *                                 type: integer
 *                                 example: 1
 *                               quantity:
 *                                 type: integer
 *                                 example: 2
 *                               price:
 *                                 type: number
 *                                 example: 649.00
 *       401:
 *         description: No token provided or invalid token
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               data:
 *                 statusCode: 401
 *                 result: No token provided. Access denied.
 *       404:
 *         description: Order not found
 *       500:
 *         description: Failed to get order by id
 */
router.get('/:id', orderController.getOrderById);

/**
 * @swagger
 * /orders/{id}/status:
 *   put:
 *     summary: Update order status
 *     description: Admin only. Updates the status of an order. Status can only move forward — In Progress → Ordered → Completed.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 example: Ordered
 *                 enum: [Ordered, Completed]
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 statuscode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     result:
 *                       type: string
 *                       example: Order status was updated
 *       400:
 *         description: Invalid status value
 *       401:
 *         description: No token provided or invalid token
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               data:
 *                 statusCode: 401
 *                 result: No token provided. Access denied.
 *       403:
 *         description: Access denied. Admins only.
 *       404:
 *         description: Order not found
 *       500:
 *         description: Failed to update order
 */
router.put('/:id/status', isAdmin, orderController.updateOrderStatus);

module.exports = router;