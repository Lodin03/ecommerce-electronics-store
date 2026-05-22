function isAdmin(req, res, next) {
  if (req.user.roleId !== 1) {
    return res.status(403).json({
      status: 'error',
      data: {
        statuscode: 403, // Status 403 means forbidden
        result: 'Access denied. Admins only.'
      }
    });
  }
  next();
}

module.exports = isAdmin;