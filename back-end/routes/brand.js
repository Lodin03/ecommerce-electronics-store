var express = require('express');
var router = express.Router();
const isAdmin = require('../middleware/adminCheck')
const brandController = require('../controllers/brandControlller')

router.get('/', brandController.getBrands);
router.post('/', isAdmin, brandController.createNewBrand);
router.put('/:id', isAdmin, brandController.updateBrand);
router.delete('/:id', isAdmin, brandController.deleteBrand);

module.exports = router