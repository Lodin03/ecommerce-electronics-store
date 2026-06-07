var express = require('express');
var router = express.Router();
const isAdmin = require('../middleware/adminCheck');
const userController = require('../controllers/userController');

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Returns all users with their role and membership information. Passwords are excluded.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users retrieved successfully
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
 *                           firstName:
 *                             type: string
 *                             example: John
 *                           lastName:
 *                             type: string
 *                             example: Doe
 *                           username:
 *                             type: string
 *                             example: johndoe
 *                           email:
 *                             type: string
 *                             example: johndoe@example.com
 *                           address:
 *                             type: string
 *                             example: 123 Main St
 *                           city:
 *                             type: string
 *                             example: Oslo
 *                           phone:
 *                             type: string
 *                             example: +47 123 456 789
 *                           Role:
 *                             type: object
 *                             properties:
 *                               name:
 *                                 type: string
 *                                 example: User
 *                           Membership:
 *                             type: object
 *                             properties:
 *                               name:
 *                                 type: string
 *                                 example: Bronze
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
 *         description: No users found
 *       500:
 *         description: Failed to get users
 */
router.get('/', isAdmin, userController.getUsers);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user
 *     description: Updates user information. Password, role and membership cannot be changed through this endpoint.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               address:
 *                 type: string
 *                 example: 123 Main St
 *               city:
 *                 type: string
 *                 example: Oslo
 *               phone:
 *                 type: string
 *                 example: +47 123 456 789
 *     responses:
 *       200:
 *         description: User updated successfully
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
 *                       example: User updated successfully
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
 *         description: User not found
 *       500:
 *         description: Failed to update user
 */
router.put('/:id', isAdmin, userController.updateUserById);

module.exports = router;