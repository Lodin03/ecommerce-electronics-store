var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController')

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a user to the database with first name, last name, username, email, password, address, city, phone, roleId (default = 1, which is User) and membershipId (default = 1, which is Bronze).
 *     tags: [Authentication]
 *     requestBody: 
 *       required: true
 *       content: 
 *         application/json:
 *           schema: 
 *             type: object
 *             required: 
 *               - firstName
 *               - lastName
 *               - username
 *               - email
 *               - password
 *               - address
 *               - city
 *               - phone
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               address:
 *                 type: string
 *               city:
 *                 type: string
 *               phone:
 *                 type: string                   
 *     responses:
 *       200:
 *         description: Account created successfully
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
 *                       example: You created an account
 *       500:
 *         description: Failed to register user
 */
router.post('/register', authController.register)
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     description: Login using either username or email with password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: 
 *               - password            
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@example.com            
 *               password:
 *                 type: string
 *                 example: Password123 
 *     responses:
 *       200:
 *         description: Login successful
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
 *                       example: You logged in successfully
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     email:
 *                       type: string
 *                       example: admin@noroff.no
 *                     name:
 *                       type: string
 *                       example: Admin
 *                     roleId:
 *                       type: integer
 *                       example: 1
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Failed to login
 */
router.post('/login', authController.login)

module.exports = router;