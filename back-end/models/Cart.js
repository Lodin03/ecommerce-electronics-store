const { DataTypes } = require('sequelize')
const sequelize = require('../config/database.js');

const Cart = sequelize.define('Cart', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    isCheckedOut: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
})

module.exports = Cart;