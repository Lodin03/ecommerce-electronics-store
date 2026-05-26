var jwt = require("jsonwebtoken");

function isAuth(req, res, next) {
  const authHeader = req.headers["authorization"];

  // Splits the header on the space and takes the second part (the actual token)
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      status: "error",
      data: {
        statusCode: 401,
        result: "No token provided. Access denied.",
      },
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      status: "error",
      data: {
        statusCode: 401,
        result: "Invalid or expired token.",
      },
    });
  }
}

module.exports = isAuth;
