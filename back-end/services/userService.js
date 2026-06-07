const { User, Role, Membership } = require("../models/index");
const { Op } = require("sequelize");

const createUser = async (data) => {
  return await User.create(data);
};

const getAllUsers = async () => {
  return await User.findAll({
    attributes: { exclude: ["password"] },
    include: [
      { model: Role, attributes: ["name"] },
      { model: Membership, attributes: ["name"] }
    ]
  });
};

const getUserById = async (id) => {
  return await User.findByPk(id, {
    attributes: { exclude: ["password"] }
  });
};

const getUserByEmailOrUsername = async (email, username) => {
  const conditions = [];
  if (email) conditions.push({ email });
  if (username) conditions.push({ username });

  return await User.findOne({ where: { [Op.or]: conditions } });
};

const updateUser = async (id, data) => {
  return await User.update(data, { where: { id } });
};

const updateUserRole = async (roleId, id) => {
  return await User.update({ roleId }, { where: { id } });
};

const updateUserMembership = async (membershipId, id) => {
  return await User.update({ membershipId }, { where: { id } });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmailOrUsername,
  updateUser,
  updateUserRole,
  updateUserMembership,
};
