const {
  getAllUsers,
  getUserById,
  updateUser,
} = require("../services/userService");

const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();

    if (!users || users.length === 0) {
      return res.status(404).json({
        status: "error",
        statuscode: 404,
        data: { result: "No users found" },
      });
    }

    res.status(200).json({
      status: "success",
      statuscode: 200,
      data: { result: users },
    });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({
      status: "error",
      statuscode: 500,
      data: { result: "Failed to get users" },
    });
  }
};

const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, address, city, phone } = req.body;

    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({
        status: "error",
        statuscode: 404,
        data: { result: "User not found" },
      });
    }

    await updateUser(id, { firstName, lastName, email, address, city, phone });
    const updatedUser = await getUserById(id);

    res.status(200).json({
      status: "success",
      statuscode: 200,
      data: { result: "User updated successfully", updatedUser },
    });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({
      status: "error",
      statuscode: 500,
      data: { result: "Failed to update user" },
    });
  }
};

module.exports = { getUsers, updateUserById };
