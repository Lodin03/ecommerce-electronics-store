var express = require('express');
var router = express.Router();
const isAdmin = require('../middleware/adminCheck');
const brandController = require('../controllers/brandControlller');

/**
 * @swagger
 * /brands:
 *   get:
 *     summary: Get all brands
 *     description: Get all brands 
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All brands retrieved successfully
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
 *                             example: Apple
 *                           createdAt:
 *                             type: string
 *                             example: 2024-01-09T07:01:46.000Z
 *                           updatedAt:
 *                             type: string
 *                             example: 2024-01-09T07:01:46.000Z
 *       400:
 *         description: No brands found
 *       500:
 *         description: Failed to get brands
 */
router.get('/', brandController.getBrands);

/**
 * @swagger
 * /brands:
 *   post:
 *     summary: Create a new brand
 *     description: Create a new brand 
 *     tags: [Brands]
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
 *             properties:
 *               name:
 *                 type: string
 *                 example: Sony
 *     responses:
 *       200:
 *         description: New brand created successfully
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
 *                       example: New brand was created
 *                     newBrand:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 5
 *                         name:
 *                           type: string
 *                           example: Sony
 *                         createdAt:
 *                           type: string
 *                           example: 2024-01-09T07:01:46.000Z
 *                         updatedAt:
 *                           type: string
 *                           example: 2024-01-09T07:01:46.000Z
 *       400:
 *         description: Brand name is required or brand already exists
 *       500:
 *         description: Failed to create new brand
 */
router.post('/', isAdmin, brandController.createNewBrand);

/**
 * @swagger
 * /brands/{id}:
 *   put:
 *     summary: Update a brand
 *     description: Update a brand
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Brand ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Samsung
 *     responses:
 *       200:
 *         description: Brand updated successfully
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
 *                       example: Updated brand successfully
 *                     updatedBrand:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         name:
 *                           type: string
 *                           example: Samsung
 *                         createdAt:
 *                           type: string
 *                           example: 2024-01-09T07:01:46.000Z
 *                         updatedAt:
 *                           type: string
 *                           example: 2024-01-09T07:01:46.000Z
 *       400:
 *         description: Brand id does not exist
 *       500:
 *         description: Failed to update brand
 */
router.put('/:id', isAdmin, brandController.updateBrand);

/**
 * @swagger
 * /brands/{id}:
 *   delete:
 *     summary: Delete a brand
 *     description: Delete a brand
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Brand ID
 *     responses:
 *       200:
 *         description: Brand deleted successfully
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
 *                       example: Brand successfully deleted
 *                     brandToDelete:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         name:
 *                           type: string
 *                           example: Apple
 *                         createdAt:
 *                           type: string
 *                           example: 2024-01-09T07:01:46.000Z
 *                         updatedAt:
 *                           type: string
 *                           example: 2024-01-09T07:01:46.000Z
 *       400:
 *         description: Brand id does not exist
 *       500:
 *         description: Failed to delete brand
 */
router.delete('/:id', isAdmin, brandController.deleteBrand);

module.exports = router;