var express = require("express");
var router = express.Router();
const axios = require("axios");

router.get("/", async function (req, res) {
  try {
    const token = req.session.user.token;
    const usersRes = await axios.get("http://localhost:3000/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
    res.render("user", {
      users: usersRes.data.data.result
    });
  } catch (error) {
    console.error("Error", error)
    res.render("user", { users: []});
  }
});

router.post("/edit/:id", async function (req, res) {
  try {
    const token = req.session.user.token;
    const { id } = req.params;
    const { firstName, lastName, email, address, city, phone } = req.body;

    await axios.put(
      `http://localhost:3000/users/${id}`,
      { firstName, lastName, email, address, city, phone },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    res.redirect("/users");
  } catch (error) {
    console.error("Error", error);
    res.redirect("/users");
  }
});

module.exports = router;
