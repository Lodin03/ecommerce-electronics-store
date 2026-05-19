const { DataTypes } = require('sequelize')
const sequelize = require('../config/database.js');

const OrderItem = sequelize.define('OrderItem', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    unitPrice: {
      type: DataTypes.DECIMAL(10,2),
      defaultValue: 0
    }
})

module.exports = OrderItem;