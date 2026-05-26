const {
  getAllBrands,
  createBrand,
  getBrandByName,
  updateBrand: updateBrandService,
  getBrandById,
  deleteBrand: deleteBrandService,
} = require("../services/brandService");

const getBrands = async (req, res) => {
  try {
    const brands = await getAllBrands();

    if (!brands || brands.length === 0) {
      return res.status(400).json({
        status: "error",
        statuscode: 400,
        data: { result: "No brands found" },
      });
    }

    res.status(200).json({
      status: "success",
      statuscode: 200,
      data: {
        result: "All brands retrieved successfully",
        brands,
      },
    });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({
      status: "error",
      statuscode: 500,
      data: { result: "Failed to get brands" },
    });
  }
};

const createNewBrand = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || name.trim() === "") {
      return res.status(400).json({
        status: "error",
        statuscode: 400,
        data: { result: "Brand name is required" },
      });
    }

    const brandExists = await getBrandByName(name);
    if (brandExists) {
      return res.status(400).json({
        status: "error",
        statuscode: 400,
        data: { result: "Brand already exists" },
      });
    }

    const newBrand = await createBrand({ name });

    res.status(200).json({
      status: "success",
      statuscode: 200,
      data: {
        result: "New brand was created",
        newBrand,
      },
    });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({
      status: "error",
      statuscode: 500,
      data: { result: "Faield to create new brand" },
    });
  }
};

const updateBrand = async (req, res) => {
  try {
    const id = req.params.id;
    const { name } = req.body;

    const brandExists = await getBrandById(id);
    if (!brandExists) {
      return res.status(400).json({
        status: "error",
        statuscode: 400,
        data: { result: "Brand id does not exist" },
      });
    }

    await updateBrandService(id, { name });
    const updatedBrand = await getBrandById(id);

    res.status(200).json({
      status: "success",
      statuscode: 200,
      data: {
        result: "Updated brand successfully",
        updatedBrand,
      },
    });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({
      status: "error",
      statuscode: 500,
      data: { result: "Failed to update brand" },
    });
  }
};

const deleteBrand = async (req, res) => {
  try {
    const id = req.params.id;

    const brandExists = await getBrandById(id);
    if (!brandExists) {
      return res.status(400).json({
        status: "error",
        statuscode: 400,
        data: { result: "Brand id does not exist" },
      });
    }

    const brandToDelete = await getBrandById(id);
    await deleteBrandService(id);

    res.status(200).json({
      status: "success",
      statuscode: 200,
      data: {
        result: "Brand successfully deleted",
        brandToDelete,
      },
    });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({
      status: "error",
      statuscode: 500,
      data: { result: "Failed to delete brand" },
    });
  }
};

module.exports = { getBrands, createNewBrand, updateBrand, deleteBrand };
