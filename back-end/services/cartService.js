const { Cart } = require("../models/index");

const createCart = async (userId) => {
  return await Cart.create({ userId, isCheckedOut: false });
};

const getCartById = async (id) => {
  return await Cart.findByPk(id);
};

const getCartByUserId = async (userId) => {
  return await Cart.findOne({ where: { userId, isCheckedOut: false } });
};

const checkoutCart = async (userId) => {
  return await Cart.update(
    { isCheckedOut: true },
    { where: { userId, isCheckedOut: false } },
  );
};

module.exports = {
  createCart,
  getCartById,
  getCartByUserId,
  checkoutCart,
};
