const axios = require('axios');
const bcrypt = require('bcryptjs');
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
    
    const response = await axios.get('http://backend.restapi.co.za/items/products');
    console.log(response.data.data); 

    await createRole({name: 'Admin'});
    await createRole({name: 'User'});

    await createMembership({name: 'Bronze', discountPercentage: 0, minPurchase: 0, maxPurchase: 14});

    await createMembership({name: 'Silver',discountPercentage: 15, minPurchase: 15, maxPurchase: 29});

    await createMembership({name: 'Gold',discountPercentage: 30, minPurchase: 30});

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