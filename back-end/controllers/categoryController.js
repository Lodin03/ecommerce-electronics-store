const {
  getAllCategories,
  createCategory,
  getCategoryByName,
  updateCategory: updateCategoryService,
  getCategoryById,
  deleteCategory: deleteCategoryService,
} = require("../services/categoryService");

const getCategories = async (req, res) => {
  try {
    const categories = await getAllCategories();
    if (!categories || categories.length === 0) {
      return res.status(404).json({
        status: "error",
        statuscode: 404,
        data: { result: "No categories found" },
      });
    }

    res.status(200).json({
      status: "success",
      statuscode: 200,
      data: { result: categories },
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      status: "error",
      statuscode: 500,
      data: { result: "Failed to get categories" },
    });
  }
};

const createNewCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || name.trim() === "") {
      return res.status(400).json({
        status: "error",
        statuscode: 400,
        data: { result: "Category name is required" },
      });
    }

    const categoryExist = await getCategoryByName(name);
    if (categoryExist) {
      return res.status(400).json({
        status: "error",
        statuscode: 400,
        data: { result: "Category already exists" },
      });
    }

    const newCategory = await createCategory({ name });

    res.status(200).json({
      status: "success",
      statuscode: 200,
      data: {
        result: "Category added to database",
        categoryName: name,
      },
    });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({
      status: "error",
      statuscode: 500,
      data: { result: "Failed to create a category." },
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({
        status: "error",
        statuscode: 400,
        data: { result: "Category name is required" },
      });
    }

    const categoryExist = await getCategoryById(id);
    if (!categoryExist) {
      return res.status(404).json({
        status: "error",
        statuscode: 404,
        data: { result: "Category not found" },
      });
    }

    await updateCategoryService(id, { name });
    const updatedCategory = await getCategoryById(id);

    res.status(200).json({
      status: "success",
      statuscode: 200,
      data: {
        result: "Category updated successfully",
        updatedCategory,
      },
    });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({
      status: "error",
      statuscode: 500,
      data: { result: "Failed to update category" },
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;

    const categoryExist = await getCategoryById(id);
    if (!categoryExist) {
      return res.status(400).json({
        status: "error",
        statuscode: 400,
        data: { result: "Category does not exist" },
      });
    }

    const categoryToDelete = await getCategoryById(id);
    await deleteCategoryService(id);

    res.status(200).json({
      status: "success",
      statuscode: 200,
      data: {
        result: "Category successfully deleted",
        categoryToDelete,
      },
    });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({
      status: "error",
      statuscode: 500,
      data: { result: "Failed to delete category" },
    });
  }
};

module.exports = {
  getCategories,
  createNewCategory,
  updateCategory,
  deleteCategory,
};
