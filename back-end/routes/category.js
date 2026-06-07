var express = require('express');
var router = express.Router();
const isAdmin = require('../middleware/adminCheck')
const categoryController = require('../controllers/categoryController')

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     description: Getting all categories
 *     tags: [Categories]               
 *     security:
 *       - bearerAuth: [] 
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
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
 *                           name:
 *                             type: string 
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
 *         description: No categories found 
 *       500:
 *         description: Failed to register user
 */

router.get('/', categoryController.getCategories);
/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create new category
 *     description: Create a new category with a name
 *     tags: [Categories]
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
 *     responses:
 *       200:
 *         description: Category added to database
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
 *                       example: Category added to database
 *                     categoryName:
 *                       type: string
 *                       example: Shoes
 *       400:
 *         description: Invalid input or category already exists
 *         content:
 *           application/json:
 *             examples:
 *               missingName:
 *                 summary: Name missing
 *                 value:
 *                   status: error
 *                   statuscode: 400
 *                   data:
 *                     result: Category name is required
 *               exists:
 *                 summary: Category exists
 *                 value:
 *                   status: error
 *                   statuscode: 400
 *                   data:
 *                     result: Category already exists
 *       500:
 *         description: Failed to create a category
 */
router.post('/', isAdmin, categoryController.createNewCategory);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update a category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Category ID
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
 *                 example: Laptops
 *     responses:
 *       200:
 *         description: Category updated successfully
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
 *                       example: Category updated successfully
 *                     updatedCategory:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         name:
 *                           type: string
 *                           example: Laptops
 *                         createdAt:
 *                           type: string
 *                           example: 2024-01-09T07:01:46.000Z
 *                         updatedAt:
 *                           type: string
 *                           example: 2024-01-09T07:01:46.000Z
 *       404:
 *         description: Category not found
 *       500:
 *         description: Failed to update category
 */
router.put('/:id', isAdmin, categoryController.updateCategory);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
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
 *                       example: Category successfully deleted
 *                     categoryToDelete:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         name:
 *                           type: string
 *                           example: Phones
 *                         createdAt:
 *                           type: string
 *                           example: 2024-01-09T07:01:46.000Z
 *                         updatedAt:
 *                           type: string
 *                           example: 2024-01-09T07:01:46.000Z
 *       400:
 *         description: Category does not exist
 *       500:
 *         description: Failed to delete category
 */
router.delete('/:id', isAdmin, categoryController.deleteCategory);

module.exports = router