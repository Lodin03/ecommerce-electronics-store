const { DataTypes } = require('sequelize')
const sequelize = require('../config/database.js');

const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    orderNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('In Progress', 'Ordered', 'Completed'),
      allowNull: false,
      defaultValue: 'In Progress'
    },
    discountApplied: {
      type: DataTypes.INTEGER, 
      allowNull: false
    },
    membershipSnapshot: {
      type: DataTypes.STRING, 
      allowNull: false
    }
})

module.exports = Order;