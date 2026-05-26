
const sequelize = require('../config/database');

const Role = require('./Role');
const Membership = require('./Membership');
const User = require('./User');
const Brand = require('./Brand');
const Category = require('./Category');
const Product = require('./Product');
const Cart = require('./Cart');
const CartItem = require('./CartItem');
const Order = require('./Order');
const OrderItem = require('./OrderItem');

Brand.hasMany(Product, { foreignKey: 'brandId' });
Product.belongsTo(Brand, { foreignKey: 'brandId' });

Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

Role.hasMany(User, { foreignKey: 'roleId' });
User.belongsTo(Role, { foreignKey: 'roleId'});

Cart.hasMany(CartItem, { foreignKey: 'cartId'});
CartItem.belongsTo(Cart, { foreignKey: 'cartId'});

Product.hasMany(CartItem, { foreignKey: 'productId' });
CartItem.belongsTo(Product, { foreignKey: 'productId'});

User.hasMany(Cart, { foreignKey: 'userId'});
Cart.belongsTo(User, { foreignKey: 'userId'});

// membershipId: 1 = Bronze, 2 = Silver, 3 = Gold (seeded by /init). By default a membership tier is Bronze
Membership.hasMany(User, { foreignKey: { name: 'membershipId', defaultValue: 1 } });
User.belongsTo(Membership, { foreignKey: { name: 'membershipId', defaultValue: 1 } });

Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

Product.hasMany(OrderItem, { foreignKey: 'productId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });

User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

// Syncing all models to the db, creating tables only if they don't exist
sequelize.sync({ force: false });

module.exports = {
  Brand, Cart, CartItem, Category, 
  Membership, Order, OrderItem, 
  Product, Role, User, sequelize
};