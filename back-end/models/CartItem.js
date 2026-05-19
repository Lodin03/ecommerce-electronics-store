const { DataTypes } = require('sequelize')
const sequelize = require('../config/database.js');

const CartItem = sequelize.define('CartItem', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false   
    },
})

module.exports = CartItem;