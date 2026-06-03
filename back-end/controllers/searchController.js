const { searchProducts } = require("../services/searchService");

const searchProduct = async (req, res) => {
  try {
    const { query } = req.body;
    const isAdmin = req.user.roleId === 1

    if (!query || query.trim() === "") {
      return res.status(400).json({
        status: "error",
        statuscode: 400,
        data: { result: "Search query is required" },
      });
    }

    const { count, results } = await searchProducts(query, isAdmin);

    res.status(200).json({
      status: "success",
      statuscode: 200,
      data: {
        result: results,
        count,
      },
    });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({
      status: "error",
      statuscode: 500,
      data: { result: "Failed searching for a product" },
    });
  }
};

module.exports = { searchProduct };
