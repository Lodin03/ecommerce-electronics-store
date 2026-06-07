var express = require("express");
var router = express.Router();
const axios = require("axios");

router.get("/", async function (req, res) {
  try {
    const token = req.session.user.token;
    const brandRes = await axios.get("http://localhost:3000/brands", {
      headers: { Authorization: `Bearer ${token}` },
    });
    res.render("brand", { brands: brandRes.data.data.result });
  } catch (error) {
    console.error("Error:", error);
    res.render("brand", { brands: [] });
  }
});

router.post("/add", async function (req, res) {
  try {
    const token = req.session.user.token;
    const { name } = req.body;
    await axios.post(
      "http://localhost:3000/brands",
      { name },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    res.redirect("/brands");
  } catch (error) {
    console.error("Error:", error);
    res.redirect("/brands");
  }
});

router.post("/edit/:id", async function (req, res) {
  try {
    const token = req.session.user.token;
    const { id } = req.params;
    const { name } = req.body;
    await axios.put(
      `http://localhost:3000/brands/${id}`,
      { name },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    res.redirect("/brands");
  } catch (error) {
    console.error("Error:", error);
    res.redirect("/brands");
  }
});

router.post("/delete/:id", async function (req, res) {
  try {
    const token = req.session.user.token;
    const { id } = req.params;
    await axios.delete(`http://localhost:3000/brands/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    res.redirect("/brands");
  } catch (error) {
    console.error("Error:", error);
    res.redirect("/brands");
  }
});

module.exports = router;