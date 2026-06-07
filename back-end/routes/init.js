var express = require('express');
var router = express.Router();
const initController = require('../controllers/initController')

/**
 * @swagger
 * /init:
 *   post:
 *     summary: Initialize the database
 *     description: Seeds the database with roles, memberships, admin user and products from the Noroff API. Can only be run once.
 *     tags: [Initialization]
 *     responses:
 *       200:
 *         description: Database initialized successfully
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
 *                       example: Database initialized successfully
 *       400:
 *         description: Database has already been initialized
 *       500:
 *         description: Failed to initialize database
 */
router.post('/', initController.init)

module.exports = router;
