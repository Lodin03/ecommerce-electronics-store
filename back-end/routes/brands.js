var express = require('express');
var router = express.Router();
const isAdmin = require('../middleware/adminCheck')
const brandsController = require('../controllers/brandsControlller')

router.get('/', brandsController.getBrands);
router.post('/', isAdmin, brandsController.createNewBrand);
router.put('/:id', isAdmin, brandsController.updateBrand);
router.delete('/:id', isAdmin, brandsController.deleteBrand);

module.exports = router