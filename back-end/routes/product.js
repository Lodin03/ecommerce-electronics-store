var express = require('express');
var router = express.Router();
const isAdmin = require('../middleware/adminCheck');
const productController = require('../controllers/productController');

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     description: Admin sees all products including soft deleted. Users only see non-deleted products.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All products retrieved successfully
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
 *                       example: All products retrieved successfully
 *                     products:
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
 *                           description:
 *                             type: string
 *                             example: 3D Touch. 12MP photos. 4K video.
 *                           unitPrice:
 *                             type: number
 *                             example: 649.00
 *                           dateAdded:
 *                             type: string
 *                             example: 2022-05-01T00:00:00.000Z
 *                           imgUrl:
 *                             type: string
 *                             example: http://images.restapi.co.za/products/product-iphone.png
 *                           quantity:
 *                             type: integer
 *                             example: 2
 *                           isDeleted:
 *                             type: integer
 *                             example: 0
 *                           brandId:
 *                             type: integer
 *                             example: 1
 *                           categoryId:
 *                             type: integer
 *                             example: 1
 *                           brand:
 *                             type: string
 *                             example: Apple
 *                           category:
 *                             type: string
 *                             example: Phones
 *       400:
 *         description: No products found
 *       500:
 *         description: Failed to get products
 */
router.get('/', productController.getProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     description: Admin can see soft deleted products. Users cannot.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product found
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
 *                       example: Product found
 *                     productById:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         name:
 *                           type: string
 *                           example: iPhone 6s Plus 16GB
 *                         description:
 *                           type: string
 *                           example: 3D Touch. 12MP photos. 4K video.
 *                         unitPrice:
 *                           type: number
 *                           example: 649.00
 *                         brand:
 *                           type: string
 *                           example: Apple
 *                         category:
 *                           type: string
 *                           example: Phones
 *       400:
 *         description: No product with this id
 *       500:
 *         description: Failed to get product by id
 */
router.get('/:id', productController.getProductById);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - unitPrice
 *               - quantity
 *               - brandId
 *               - categoryId
 *             properties:
 *               name:
 *                 type: string
 *                 example: iPhone 15 Pro
 *               description:
 *                 type: string
 *                 example: Titanium design with A17 Pro chip
 *               unitPrice:
 *                 type: number
 *                 example: 999.99
 *               imgUrl:
 *                 type: string
 *                 example: http://images.restapi.co.za/products/product-iphone.png
 *               quantity:
 *                 type: integer
 *                 example: 10
 *               brandId:
 *                 type: integer
 *                 example: 1
 *               categoryId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Product created successfully
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
 *                       example: Successfully added new product
 *       400:
 *         description: Required fields missing or product already exists
 *       500:
 *         description: Failed to add new product
 */
router.post('/', isAdmin, productController.newProduct);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product
 *     description: All fields are optional. dateAdded cannot be updated.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: iPhone 15 Pro 512GB
 *               description:
 *                 type: string
 *                 example: Updated description
 *               unitPrice:
 *                 type: number
 *                 example: 1199.99
 *               quantity:
 *                 type: integer
 *                 example: 5
 *               imgUrl:
 *                 type: string
 *                 example: http://images.restapi.co.za/products/product-iphone.png
 *               brandId:
 *                 type: integer
 *                 example: 1
 *               categoryId:
 *                 type: integer
 *                 example: 1
 *               isDeleted:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Product updated successfully
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
 *                       example: Product successfully updated
 *       400:
 *         description: Product does not exist
 *       500:
 *         description: Failed to update product
 */
router.put('/:id', isAdmin, productController.updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Soft delete a product
 *     description: Sets isDeleted to true. Product is not permanently removed.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product soft deleted successfully
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
 *                       example: Successfully soft deleted product
 *                     productName:
 *                       type: string
 *                       example: iPhone 6s Plus 16GB
 *       400:
 *         description: Product does not exist
 *       500:
 *         description: Failed to soft delete product
 */
router.delete('/:id', isAdmin, productController.softDeleteProduct);

module.exports = router;