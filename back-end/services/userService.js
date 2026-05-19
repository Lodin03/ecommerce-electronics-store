const { User } = require('../models/index')
const { Op } = require('sequelize');

const createUser = async (data) => {
  return await User.create(data);
}

const getAllUsers = async () => {
  return await User.findAll()  
}

const getUserById = async (id) => {
  return await User.findByPk(id);  
}

const getUserByEmailOrUsername = async (email, username) => {
  return await User.findOne({where: {[Op.or]: [{email: email}, {username: username}]}})  
}

const updateUserRole = async (roleId, id) => {
  return await User.update({roleId}, {where: {id}});
}

const updateUserMembership = async (membershipId, id) => {
  return await User.update({membershipId}, {where: {id}});
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmailOrUsername,
  updateUserRole,  
  updateUserMembership  
}