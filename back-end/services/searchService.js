const { sequelize } = require("../models/index");

const searchProducts = async (query) => {
  const searchValue = `%${query}%`; // means anything that has "query" anywhere in the name (e.g. "6s" in iPhone 6s Plus)
  const results = await sequelize.query(
    `SELECT Products.*, Brands.name AS brand, Categories.name AS category
     FROM Products
     JOIN Brands ON Products.brandId = Brands.id
     JOIN Categories ON Products.categoryId = Categories.id
     WHERE Products.isDeleted = 0
     AND (
       Products.name LIKE :searchValue
       OR Brands.name LIKE :searchValue
       OR Categories.name LIKE :searchValue
     )`,
    {
      replacements: { searchValue },
      type: sequelize.QueryTypes.SELECT,
    },
  );

  return {
    count: results.length,
    results,
  };
};

module.exports = { searchProducts };
