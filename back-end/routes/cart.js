var express = require('express');
var router = express.Router();
const cartController = require('../controllers/cartController');

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get active cart
 *     description: Returns the current user's active (not checked out) cart with all items and totals.
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Active cart retrieved successfully
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
 *                         cartId:
 *                           type: integer
 *                           example: 1
 *                         isCheckedOut:
 *                           type: boolean
 *                           example: false
 *                         items:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               cartItemId:
 *                                 type: integer
 *                                 example: 1
 *                               productId:
 *                                 type: integer
 *                                 example: 1
 *                               name:
 *                                 type: string
 *                                 example: iPhone 6s Plus 16GB
 *                               price:
 *                                 type: number
 *                                 example: 649.00
 *                               quantity:
 *                                 type: integer
 *                                 example: 2
 *                               subtotal:
 *                                 type: number
 *                                 example: 1298.00
 *                         total:
 *                           type: number
 *                           example: 1298.00
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
 *         description: No active cart found
 *       500:
 *         description: Failed to get active cart
 */
router.get('/', cartController.getCart);

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Add product to cart
 *     description: Adds a product to the user's active cart. If the product already exists in the cart, the quantity is increased by one. Out-of-stock items cannot be added.
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: integer
 *                 example: 1
 *               quantity:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Product added to cart successfully
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
 *                       example: Product added to cart
 *       400:
 *         description: Not enough stock or invalid quantity
 *         content:
 *           application/json:
 *             examples:
 *               notEnoughStock:
 *                 summary: Not enough stock
 *                 value:
 *                   status: error
 *                   statuscode: 400
 *                   data:
 *                     result: Not enough stock available
 *               invalidQuantity:
 *                 summary: Invalid quantity
 *                 value:
 *                   status: error
 *                   statuscode: 400
 *                   data:
 *                     result: Quantity must be at least 1
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
 *         description: Product not found
 *       500:
 *         description: Failed to add product to cart
 */
router.post('/', cartController.addToCart);

/**
 * @swagger
 * /cart/checkout/now:
 *   post:
 *     summary: Checkout cart
 *     description: Checks out the active cart, creates an order with status "In Progress", reduces product stock, and recalculates membership discount.
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart checked out successfully
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
 *                       example: Cart checked out successfully
 *                     orderNumber:
 *                       type: string
 *                       example: 6ad4JHid
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
 *         description: No active cart found
 *       500:
 *         description: Failed to checkout cart
 */
router.post('/checkout/now', cartController.checkout);

module.exports = router;