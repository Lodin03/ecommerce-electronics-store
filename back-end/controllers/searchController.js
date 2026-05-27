const { searchProducts } = require("../services/searchService");

const searchProduct = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query || query.trim() === "") {
      return res.status(400).json({
        status: "error",
        statuscode: 400,
        data: { result: "Search query is required" },
      });
    }

    const { count, results } = await searchProducts(query);

    if (count === 0) {
      return res.status(404).json({
        status: "error",
        statuscode: 404,
        data: { result: "No products found" },
      });
    }

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
