const { Brand } = require('../models/index');

const getAllBrands = async () => {
  return await Brand.findAll();
}

const getBrandById = async (id) => {
  return await Brand.findByPk(id);  
}

const createBrand = async (data) => {
  return await Brand.create(data);  
}

const updateBrand = async (id, data) => {
  return await Brand.update(data, {where: {id}}); 
}

const deleteBrand = async (id) => {
  return await Brand.destroy({where: {id}})  
}

module.exports = {
  getAllBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand  
}