var express = require("express");
var router = express.Router();
const isAdmin = require("../middleware/adminCheck");
const roleController = require("../controllers/roleController");

router.get("/", isAdmin, roleController.getRoles);

module.exports = router;
