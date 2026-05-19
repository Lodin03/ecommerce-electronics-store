const { DataTypes } = require('sequelize')
const sequelize = require('../config/database.js');

const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
}, {
  tableName: 'Categories' // So that table name would not be created as 'Categorys'
})

module.exports = Category;