var express = require('express');
var router = express.Router();
const initController = require('../controllers/initController')

router.post('/', initController.init)

module.exports = router;
