const axios = require('axios');
const bcrypt = require('bcryptjs');

const { createBrand, getBrandByName } = require('../services/brandService');
const { createCategory, getCategoryByName } = require('../services/categoryService');
const { createProduct } = require('../services/productService');
const { getAllRoles, createRole } = require('../services/roleService');
const { createUser } = require('../services/userService');
const { createMembership } = require('../services/membershipService');

const init = async (req, res) => {
  try {
    // This is a guard, so that /init only can be ran once
    const roles = await getAllRoles();
    
    if (roles.length > 0) {
      return res.status(400).json({
        status: 'error',
        statuscode: 400,
        data: { result: 'Database has already been initialized' }
      });
    }

    // 1. Seed Roles 
    await createRole({name: 'Admin'});
    await createRole({name: 'User'});

    // 2. Seed Memberships
    await createMembership({name: 'Bronze', discountPercentage: 0, minPurchase: 0, maxPurchase: 14});
    await createMembership({name: 'Silver',discountPercentage: 15, minPurchase: 15, maxPurchase: 29});
    await createMembership({name: 'Gold',discountPercentage: 30, minPurchase: 30});

    // 3. Seed Admin User (all passwords must be hashed)
    const hashedPassword = await bcrypt.hash('P@ssword2023', 10);
    await createUser({
      firstName: 'Admin', 
      lastName: 'Support', 
      username: 'Admin',
      email: 'admin@noroff.no',
      password: hashedPassword,
      address: 'Online',
      city: '', // Not specified in 'Creating an initial Admin user'
      phone: '911',
      roleId: 1,
      membershipId: 1
    });

    // 4. Seed data from Noroff API
    const response = await axios.get('http://backend.restapi.co.za/items/products');
    const products = response.data.data;

    for (const item of products) {
      let brand = await getBrandByName(item.brand);
      if (!brand) {
        brand = await createBrand({ name: item.brand });
      }

      let category = await getCategoryByName(item.category);
      if (!category) {
        category = await createCategory({ name: item.category });
      }

      await createProduct({
        name: item.name,
        description: item.description,
        unitPrice: item.price,
        dateAdded: item.date_added,
        imgUrl: item.imgurl,
        quantity: item.quantity,
        isDeleted: false,
        brandId: brand.id,
        categoryId: category.id
      });
    }

    res.status(200).json({
      status: 'success',
      statuscode: 200,
      data: { result: 'Database initialized successfully' }
    });
  } catch (error) {
    console.error('Error fetching data:', error);

    res.status(500).json({
      status: 'error',
      statuscode: 500,
      data: { result: 'Failed to initialize database' }
    });
  }
}

module.exports = { init }