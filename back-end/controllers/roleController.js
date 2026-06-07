const { getAllRoles } = require("../services/roleService")

const getRoles = async (req, res) => {
  try {
    const roles = await getAllRoles();

    if (!roles || roles.length === 0) {
      return res.status(400).json({
        status: "error",
        statuscode: 400,
        data: { result: "No roles found" },
      });
    }

    res.status(200).json({
      status: "success",
      statuscode: 200,
      data: { result: roles },
    });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({
      status: "error",
      statuscode: 500,
      data: { result: "Failed to get roles" },
    });
  }
};

module.exports = { getRoles };