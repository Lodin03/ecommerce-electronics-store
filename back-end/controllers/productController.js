const { getAllProducts } = require("../services/productService.js");

const getProducts = async (req, res) => {
  try {
    const isAdmin = req.user.roleId === 1;
    const products = await getAllProducts(isAdmin);

    if (!products || products.length === 0) {
      return res.status(400).json({
        status: "error",
        statuscode: 400,
        data: { result: "No products found" },
      });
    }

    res.status(200).json({
      status: "success",
      statuscode: 200,
      data: {
        result: "All products retrieved successfully",
        products,
      },
    });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({
      status: "error",
      statuscode: 500,
      data: { result: "Failed to get products" },
    });
  }
};

module.exports = { getProducts };
