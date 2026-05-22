const { createCart, getCartByUserId, checkoutCart } = require('../services/cartService');
const { getCartItems, createCartItem, getCartItemByProductId, updateCartItemQuantity } = require('../services/cartItemService');
const { createOrder } = require('../services/orderService');
const { createOrderItem } = require('../services/orderItemService');
const { getProductById } = require('../services/productService');
const { getUserById, updateUserMembership } = require('../services/userService');
const { getAllMemberships } = require('../services/membershipService');

const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    // Check if product exists
    const product = await getProductById(productId);
    if (!product) {
      return res.status(404).json({
        status: 'error',
        statuscode: 404,
        data: { result: 'Product not found' }
      });
    }

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        status: 'error',
        statuscode: 400,
        data: { result: 'Quantity must be at least 1' }
      });
    }

    if (product.quantity < quantity) {
      return res.status(400).json({
        status: 'error',
        statuscode: 400,
        data: { result: 'Not enough stock available' }
      });
    }

    let cart = await getCartByUserId(userId);
    if (!cart) {
      cart = await createCart(userId);
    }

    const existingItem = await getCartItemByProductId(productId, cart.id);
    if (existingItem) {
      if (product.quantity < existingItem.quantity + 1) {
        return res.status(400).json({
          status: 'error',
          statuscode: 400,
          data: { result: 'Not enough stock available' }
        })
      }
      // Project requirement: adding the same product to the cart always increases quantity by 1
      await updateCartItemQuantity(existingItem.id, existingItem.quantity + 1);
    } else {
      await createCartItem({ cartId: cart.id, productId, quantity });
    }

    res.status(200).json({
      status: 'success',
      statuscode: 200,
      data: { result: 'Product added to cart' }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      status: 'error',
      statuscode: 500,
      data: { result: 'Failed to add product to cart' }
    });
  }
};

const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await getCartByUserId(userId);
    if (!cart) {
      return res.status(404).json({
        status: 'error',
        statuscode: 404,
        data: { result: 'No active cart found' }
      });
    }

    const cartItems = await getCartItems(cart.id);

    const items = await Promise.all(
      cartItems.map(async (item) => {
        const product = await getProductById(item.productId);
        return {
          cartItemId: item.id,
          productId: product.id,
          name: product.name,
          price: product.unitPrice,
          quantity: item.quantity,
          subtotal: product.unitPrice * item.quantity
        };
      })
    );

    const total = items.reduce((sum, item) => sum + item.subtotal, 0);

    res.status(200).json({
      status: 'success',
      statuscode: 200,
      data: {
        result: {
          cartId: cart.id,
          items,
          total
        }
      }
    });
  } catch (error) {
    console.error('Error', error);
    res.status(500).json({
      status: 'error',
      statuscode: 500,
      data: { result: 'Failed to get active cart' }
    });
  }
};

// Generates a unique 8-character order number as required by the task
const generateOrderNumber = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const checkout = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await getCartByUserId(userId);
    if (!cart) {
      return res.status(404).json({
        status: 'error',
        statuscode: 404,
        data: { result: 'No active cart found' }
      });
    }

    const cartItems = await getCartItems(cart.id);
    if (cartItems.length === 0) {
      return res.status(400).json({
        status: 'error',
        statuscode: 400,
        data: { result: 'Cart is empty' }
      });
    }

    const user = await getUserById(userId);
    const memberships = await getAllMemberships();
    const userMembership = memberships.find(m => m.id === user.membershipId);

    const discountApplied = userMembership ? userMembership.discountPercentage : 0;

    const orderNumber = generateOrderNumber();

    const order = await createOrder({
      orderNumber,
      status: 'In Progress',
      discountApplied,
      membershipSnapshot: userMembership ? userMembership.name : 'Bronze',
      userId
    });

    for (const item of cartItems) {
      const product = await getProductById(item.productId);
      await createOrderItem({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: product.unitPrice
      });
    }

    await checkoutCart(userId);

    const allOrders = await require('../services/orderService').getOrdersByUserId(userId);
    const allOrderItems = await Promise.all(
      allOrders.map(o => require('../services/orderItemService').getOrderItemsByOrderId(o.id))
    );
    const totalItemsPurchased = allOrderItems.flat().reduce((sum, item) => sum + item.quantity, 0);

    const newMembership = memberships.find(m => {
      if (m.name === 'Gold') return totalItemsPurchased >= m.minPurchase;
      if (m.name === 'Silver') return totalItemsPurchased >= m.minPurchase && totalItemsPurchased <= m.maxPurchase;
      return true;
    });

    if (newMembership && newMembership.id !== user.membershipId) {
      await updateUserMembership(newMembership.id, userId);
    }

    res.status(200).json({
      status: 'success',
      statuscode: 200,
      data: {
        result: 'Order created successfully',
        orderNumber,
        status: 'In Progress',
        discountApplied
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      status: 'error',
      statuscode: 500,
      data: { result: 'Failed to checkout cart' }
    });
  }
};

module.exports = { addToCart, getCart, checkout };