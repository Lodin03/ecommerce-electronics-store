const { sequelize } = require("../models/index");

const searchProducts = async (query, isAdmin) => {
  const searchValue = `%${query}%`;
  const deletedClause = isAdmin ? "" : "AND Products.isDeleted = 0";
  const results = await sequelize.query(
    `SELECT Products.*, Brands.name AS brand, Categories.name AS category
     FROM Products
     JOIN Brands ON Products.brandId = Brands.id
     JOIN Categories ON Products.categoryId = Categories.id
     WHERE (
       Products.name LIKE :searchValue
       OR Brands.name LIKE :searchValue
       OR Categories.name LIKE :searchValue
     )
     ${deletedClause}
     ORDER BY Products.id ASC`,
    {
      replacements: { searchValue },
      type: sequelize.QueryTypes.SELECT
    }
  );

  return {
    count: results.length,
    results
  };
};

module.exports = { searchProducts };
