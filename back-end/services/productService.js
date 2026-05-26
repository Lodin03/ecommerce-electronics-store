const { Product, sequelize } = require("../models/index");

const getAllProducts = async (isAdmin) => {
  // Admin should see all products deleted and not deleted from the GET /products endpoint, 
  // meanwhile the User role should only see the products that are not deleted. 
  const whereClause = isAdmin ? "" : "WHERE Products.isDeleted = 0";
  return await sequelize.query(
    `SELECT Products.*, Brands.name AS brand, Categories.name AS category
     FROM Products
     JOIN Brands ON Products.brandId = Brands.id
     JOIN Categories ON Products.categoryId = Categories.id
     ${whereClause}`,
    { type: sequelize.QueryTypes.SELECT }
  );
};

const getProductById = async (id) => {
  return await Product.findByPk(id);
};

const createProduct = async (data) => {
  return await Product.create(data);
};

const updateProduct = async (id, data) => {
  return await Product.update(data, { where: { id } });
};

const deleteProduct = async (id) => {
  return await Product.update({ isDeleted: true }, { where: { id } });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
