var express = require("express");
var router = express.Router();
const axios = require("axios");

// GET - login page
router.get("/", function (req, res) {
  if (req.session.user) {
    return res.redirect("/products"); // Redirect to /products if logged in.
  }
  res.render("login", { layout: false, error: null }); // Layout should not be loaded on login page.
});

// POST - handle login request
router.post("/", async function (req, res) {
  try {
    const { emailOrUsername, password } = req.body;

    const response = await axios.post("http://localhost:3000/auth/login", {
      email: emailOrUsername,
      username: emailOrUsername,
      password,
    });

    const { token, id, name, roleId } = response.data.data;
    if (roleId !== 1) {
      return res.render("login", {
        layout: false,
        error: "Access denied. Admins only.",
      });
    }

    req.session.user = { id, name, token, roleId };
    res.redirect("/products");
  } catch (error) {
    res.render("login", {
      layout: false,
      error: "Invalid credentials. Please try again",
    });
  }
});

// POST - handle logout request
router.post("/logout", function (req, res) {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
