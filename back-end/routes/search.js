var express = require('express');
var router = express.Router();
const isAdmin = require('../middleware/adminCheck')
const searchController = require('../controllers/searchController')

router.post('/', searchController.searchProduct);

module.exports = router