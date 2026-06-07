var express = require('express');
var router = express.Router();
const isAdmin = require('../middleware/adminCheck');
const roleController = require('../controllers/roleController');

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Get all roles
 *     description: Returns all available roles in the system.
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Roles retrieved successfully
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
 *                             example: Admin
 *       401:
 *         description: No token provided or invalid token
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               data:
 *                 statusCode: 401
 *                 result: No token provided. Access denied.
 *       500:
 *         description: Failed to get roles
 */
router.get('/', isAdmin, roleController.getRoles);

module.exports = router;