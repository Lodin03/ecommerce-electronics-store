var express = require("express");
var router = express.Router();
const axios = require("axios");

router.get("/", async function (req, res) {
  try {
    const token = req.session.user.token;
    const orderRes = await axios.get("http://localhost:3000/orders", {
      headers: { Authorization: `Bearer ${token}` },
    });
    res.render("order", {
      orders: orderRes.data.data.result
    });
  } catch (error) {
    console.error("Error", error)
    res.render("order", { orders: []});
  }
});

module.exports = router;