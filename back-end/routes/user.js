var express = require("express");
var router = express.Router();
const isAdmin = require("../middleware/adminCheck");
const userController = require("../controllers/userController");

router.get("/", isAdmin, userController.getUsers);
router.put('/:id', isAdmin, userController.updateUserById);

module.exports = router;
