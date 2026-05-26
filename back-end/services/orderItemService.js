const { OrderItem } = require("../models/index");

const createOrderItem = async (data) => {
  return await OrderItem.create(data);
};

const getOrderItemsByOrderId = async (orderId) => {
  return await OrderItem.findAll({ where: { orderId } });
};

module.exports = { createOrderItem, getOrderItemsByOrderId };
