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
     ${whereClause}
     ORDER BY Products.id ASC`,
    { type: sequelize.QueryTypes.SELECT },
  );
};

const getProductById = async (id, isAdmin) => {
  const deletedClause = isAdmin ? "" : "AND Products.isDeleted = 0";

  // :id is a placeholder, replacements safely inserts the id to prevent SQL injection
  const [product] = await sequelize.query(
    `SELECT Products.*, Brands.name AS brand, Categories.name AS category
     FROM Products
     JOIN Brands ON Products.brandId = Brands.id
     JOIN Categories ON Products.categoryId = Categories.id
     WHERE Products.id = :id
     ${deletedClause}
     ORDER BY Products.id ASC`,
    {
      replacements: { id },
      type: sequelize.QueryTypes.SELECT,
    },
  );
  return product;
};

const getProductByName = async (name) => {
  return await Product.findOne({ where: { name } });
};

const createProduct = async (data) => {
  return await Product.create(data);
};

const updateProduct = async (id, data) => {
  return await Product.update(data, { where: { id } });
};

const updateProductQuantity = async (id, quantity) => {
  return await Product.update({ quantity }, { where: { id } });
};

const deleteProduct = async (id) => {
  return await Product.update({ isDeleted: true }, { where: { id } });
};

module.exports = {
  getAllProducts,
  getProductById,
  getProductByName,
  createProduct,
  updateProduct,
  updateProductQuantity,
  deleteProduct,
};
