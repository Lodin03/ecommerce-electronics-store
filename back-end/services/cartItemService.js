const { CartItem } = require("../models/index");

const getCartItems = async (cartId) => {
  return await CartItem.findAll({ where: { cartId } });
};

const getCartItemByProductId = async (productId, cartId) => {
  return await CartItem.findOne({ where: { productId, cartId } });
};

const createCartItem = async (data) => {
  return await CartItem.create(data);
};

const updateCartItemQuantity = async (id, quantity) => {
  return await CartItem.update({ quantity }, { where: { id } });
};

module.exports = {
  getCartItems,
  getCartItemByProductId,
  createCartItem,
  updateCartItemQuantity,
};
