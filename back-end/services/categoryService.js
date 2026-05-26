const { Category } = require("../models/index");

const getAllCategories = async () => {
  return await Category.findAll();
};

const getCategoryById = async (id) => {
  return await Category.findByPk(id);
};

const getCategoryByName = async (name) => {
  return await Category.findOne({ where: { name } });
};

const createCategory = async (data) => {
  return await Category.create(data);
};

const updateCategory = async (id, data) => {
  return await Category.update(data, { where: { id } });
};

const deleteCategory = async (id) => {
  return await Category.destroy({ where: { id } });
};
module.exports = {
  getAllCategories,
  getCategoryById,
  getCategoryByName,
  createCategory,
  updateCategory,
  deleteCategory,
};
