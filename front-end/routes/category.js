var express = require("express");
var router = express.Router();
const axios = require("axios");

router.get("/", async function (req, res) {
  try {
    const token = req.session.user.token;
    const categoriesRes = await axios.get("http://localhost:3000/categories", {
      headers: { Authorization: `Bearer ${token}` },
    });
    res.render("category", {
      categories: categoriesRes.data.data.result
    });
  } catch (error) {
    console.error("Error:", error);
    res.render("category", { categories: []});
  }
});

router.post("/add", async function (req, res) {
  try {
    const token = req.session.user.token;
    const { name } = req.body;
    await axios.post(
      "http://localhost:3000/categories",
      { name },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    res.redirect("/categories");
  } catch (error) {
    console.error("Error:", error);
    res.redirect("/categories");
  }
});

router.post("/edit/:id", async function (req, res) {
  try {
    const token = req.session.user.token;
    const { id } = req.params;
    const { name } = req.body;
    await axios.put(
      `http://localhost:3000/categories/${id}`,
      { name },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    res.redirect("/categories");
  } catch (error) {
    console.error("Error:", error);
    res.redirect("/categories");
  }
});

router.post("/delete/:id", async function (req, res) {
  try {
    const token = req.session.user.token;
    const { id } = req.params;
    await axios.delete(`http://localhost:3000/categories/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    res.redirect("/categories");
  } catch (error) {
    console.error("Error:", error);
    res.redirect("/categories");
  }
});

module.exports = router;
