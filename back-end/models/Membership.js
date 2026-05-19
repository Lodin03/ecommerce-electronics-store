const { DataTypes } = require('sequelize')
const sequelize = require('../config/database.js');

const Membership = sequelize.define('Membership', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    discountPercentage: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    minPurchase: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    maxPurchase: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
})

module.exports = Membership;