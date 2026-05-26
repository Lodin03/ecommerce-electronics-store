const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  createUser,
  getUserByEmailOrUsername,
} = require("../services/userService");

const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      address,
      city,
      phone,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      address,
      city,
      phone,
      roleId: 2,
      membershipId: 1,
    });

    res.status(200).json({
      status: "success",
      statuscode: 200,
      data: { result: "You created an account" },
    });
  } catch (error) {
    console.error("Error fetching data:", error);

    res.status(500).json({
      status: "error",
      statuscode: 500,
      data: { result: "Failed to register user" },
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = await getUserByEmailOrUsername(email, username);
    if (!user) {
      return res.status(401).json({
        status: "error",
        statuscode: 401,
        data: { result: "Invalid credentials" },
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: "error",
        statuscode: 401,
        data: { result: "Invalid credentials" },
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, roleId: user.roleId },
      process.env.JWT_SECRET,
      { expiresIn: "2h" },
    );

    res.status(200).json({
      status: "success",
      statuscode: 200,
      data: {
        result: "You logged in successfully",
        id: user.id,
        email: user.email,
        name: user.username,
        token,
      },
    });
  } catch (error) {
    console.error("Error fetching data:", error);

    res.status(500).json({
      status: "error",
      statuscode: 500,
      data: { result: "Failed to login" },
    });
  }
};

module.exports = { register, login };
