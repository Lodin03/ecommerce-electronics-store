var express = require('express');
var router = express.Router();
const searchController = require('../controllers/searchController');

/**
 * @swagger
 * /search:
 *   post:
 *     summary: Search for products
 *     description: Search by partial product name, category name or brand name using raw SQL LIKE queries.
 *     tags: [Search]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - query
 *             properties:
 *               query:
 *                 type: string
 *                 example: iPhone
 *     responses:
 *       200:
 *         description: Search results returned successfully
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
 *                           name:
 *                             type: string
 *                             example: iPhone 6s Plus 16GB
 *                           unitPrice:
 *                             type: number
 *                             example: 649.00
 *                           brand:
 *                             type: string
 *                             example: Apple
 *                           category:
 *                             type: string
 *                             example: Phones
 *                     count:
 *                       type: integer
 *                       example: 3
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Failed searching for a product
 */
router.post('/', searchController.searchProduct);

module.exports = router;