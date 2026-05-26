const {
  getAllProducts,
  getProductById: getProductByIdService,
  createProduct,
  getProductByName,
  updateProduct: updateProductService,
  deleteProduct,
} = require("../services/productService.js");

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

const getProductById = async (req, res) => {
  try {
    const isAdmin = req.user.roleId === 1;
    const id = req.params.id;
    const productById = await getProductByIdService(id, isAdmin);

    if (!productById || productById.length === 0) {
      return res.status(400).json({
        status: "error",
        statuscode: 400,
        data: { result: "No product with this id" },
      });
    }

    res.status(200).json({
      status: "success",
      statuscode: 200,
      data: {
        result: "Product found",
        productById,
      },
    });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({
      status: "error",
      statuscode: 500,
      data: { result: "Failed to get product by id" },
    });
  }
};

const newProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      unitPrice,
      imgUrl,
      quantity,
      brandId,
      categoryId,
    } = req.body;
    const dateAdded = Date.now();

    if (!name || !unitPrice || !quantity || !brandId || !categoryId) {
      return res.status(400).json({
        status: "error",
        statuscode: 400,
        data: {
          result:
            "name, unitPrice, quantity, brandId and categoryId are required",
        },
      });
    }

    const productExist = await getProductByName(name);
    if (productExist) {
      return res.status(400).json({
        status: "error",
        statuscode: 400,
        data: { result: "Product already exists" },
      });
    }

    const nProduct = await createProduct({
      name,
      description,
      unitPrice,
      dateAdded,
      imgUrl,
      quantity,
      brandId,
      categoryId,
    });

    res.status(200).json({
      status: "success",
      statuscode: 200,
      data: {
        result: "Successfully added new product",
        nProduct,
      },
    });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({
      status: "error",
      statuscode: 500,
      data: { result: "Failed to add new product" },
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const productExist = await getProductByIdService(id);
    if (!productExist) {
      return res.status(400).json({
        status: "error",
        statuscode: 400,
        data: { result: "Product does not exist" },
      });
    }

    // Exclude dateAdded and isDeleted from updates
    const { dateAdded, isDeleted, ...updateData } = req.body;
    await updateProductService(id, updateData);
    const updatedProduct = await getProductByIdService(id, true);

    res.status(200).json({
      status: "success",
      statuscode: 200,
      data: {
        result: "Product successfully updated",
        updatedProduct,
      },
    });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({
      status: "error",
      statuscode: 500,
      data: { result: "Failed to update product" },
    });
  }
};

const softDeleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const productToDelete = await getProductByIdService(id);
    if (!productToDelete) {
      return res.status(400).json({
        status: "error",
        statuscode: 400,
        data: { result: "Product does not exist" },
      });
    }

    await deleteProduct(id);

    res.status(200).json({
      status: "success",
      statuscode: 200,
      data: { 
        result: "Successfully soft deleted product",
        productName: productToDelete.name 
      },
    });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({
      status: "error",
      statuscode: 500,
      data: {
        result: "Failed to soft delete product"
      },
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  newProduct,
  updateProduct,
  softDeleteProduct,
};
