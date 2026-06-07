var express = require("express");
var router = express.Router();
const axios = require("axios");

router.get("/", async function (req, res) {
  try {
    const token = req.session.user.token;
    const { query } = req.query;
    const searchQuery = query && query.trim() ? query.trim() : null;

    const [categoriesRes, brandsRes] = await Promise.all([
      axios.get("http://localhost:3000/categories", {
        headers: { Authorization: `Bearer ${token}` },
      }),
      axios.get("http://localhost:3000/brands", {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ]);

    let products = [];

    if (searchQuery) {
      const searchRes = await axios.post(
        "http://localhost:3000/search",
        { query: searchQuery },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      products = searchRes.data.data.result;
    } else {
      const productsRes = await axios.get("http://localhost:3000/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      products = productsRes.data.data.products;
    }

    res.render("product", {
      products,
      categories: categoriesRes.data.data.result,
      brands: brandsRes.data.data.result,
      searchQuery: query || "",
    });
  } catch (error) {
    console.error("Error:", error);
    res.render("product", {
      products: [],
      categories: [],
      brands: [],
      searchQuery: "",
    });
  }
});

router.post("/add", async function (req, res) {
  try {
    const token = req.session.user.token;
    const { name, description, unitPrice, quantity, imgUrl, brandId, categoryId } = req.body;

    await axios.post("http://localhost:3000/products", {
      name,
      description,
      unitPrice: parseFloat(unitPrice),
      quantity: parseInt(quantity),
      imgUrl,
      brandId: parseInt(brandId),
      categoryId: parseInt(categoryId)
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    res.redirect("/products");
  } catch (error) {
    console.error("Error:", error);
    res.redirect("/products");
  }
});

router.post("/delete/:id", async function (req, res) {
  try {
    const token = req.session.user.token;
    const { id } = req.params;
    await axios.delete(`http://localhost:3000/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    res.redirect("/products");
  } catch (error) {
    console.error("Error:", error);
    res.redirect("/products");
  }
});

router.post("/edit/:id", async function (req, res) {
  try {
    const token = req.session.user.token;
    const { id } = req.params;
    const { name, description, unitPrice, quantity, imgUrl, brandId, categoryId, isDeleted } = req.body;

    await axios.put(`http://localhost:3000/products/${id}`, {
      name,
      description,
      unitPrice: parseFloat(unitPrice),
      quantity: parseFloat(quantity),
      imgUrl,
      brandId: parseInt(brandId),
      categoryId: parseInt(categoryId),
      isDeleted: isDeleted === 'true'
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    res.redirect('/products');
  } catch (error) {
    console.error('Error:', error);
    res.redirect('/products');
  }
});

module.exports = router;