var express = require("express");
var router = express.Router();
const axios = require("axios");

router.get("/", async function (req, res) {
  try {
    const token = req.session.user.token;
    const rolesRes = await axios.get("http://localhost:3000/roles", {
      headers: { Authorization: `Bearer ${token}` },
    });
    res.render("role", {
      roles: rolesRes.data.data.result
    });
  } catch (error) {
    console.error("Error", error)
    res.render("role", { roles: []});
  }
});

module.exports = router;