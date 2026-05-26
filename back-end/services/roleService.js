const { Role } = require("../models/index");

const getAllRoles = async () => {
  return await Role.findAll();
};
const createRole = async (data) => {
  return await Role.create(data);
};

module.exports = { getAllRoles, createRole };
