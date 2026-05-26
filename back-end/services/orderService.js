const { Order } = require("../models/index");

const createOrder = async (data) => {
  return await Order.create(data);
};

const getOrderById = async (id) => {
  return await Order.findByPk(id);
};

const getOrdersByUserId = async (userId) => {
  return await Order.findAll({ where: { userId } });
};

const updateOrderStatus = async (id, status) => {
  return await Order.update({ status }, { where: { id } });
};

module.exports = {
  createOrder,
  getOrderById,
  getOrdersByUserId,
  updateOrderStatus,
};
