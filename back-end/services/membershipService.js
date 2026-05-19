const { Membership } = require('../models/index');

const getAllMemberships = async () => {
  return await Membership.findAll();
}

const getMembershipById = async (id) => {
  return await Membership.findByPk(id);
}

const createMembership = async (data) => {
  return await Membership.create(data)
}

module.exports = {
  getAllMemberships,
  getMembershipById,
  createMembership
}