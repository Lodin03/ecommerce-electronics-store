const request = require("supertest");
const app = require("../app");
const sequelize = require('../config/database');

// Store IDs for cleanup and chaining between tests
let adminToken;
let categoryId;
let brandId;
let productId;

const testCategory = `TEST_CATEGORY_${Date.now()}`;
const testBrand = `TEST_BRAND_${Date.now()}`;
const testProduct = `TEST_PRODUCT_${Date.now()}`;

// Login as admin before all tests
beforeAll(async () => {
  const res = await request(app)
    .post("/auth/login")
    .send({ email: "admin@noroff.no", password: "P@ssword2023" });
  adminToken = res.body.data.token;
});

// 1. Add a category with the name TEST_CATEGORY
test("Add category TEST_CATEGORY", async () => {
  const res = await request(app)
    .post("/categories")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({ name: testCategory });

  expect(res.statusCode).toBe(200);
  expect(res.body.status).toBe("success");

  // Fetch category id for later tests
  const categories = await request(app)
    .get("/categories")
    .set("Authorization", `Bearer ${adminToken}`);
  const category = categories.body.data.result.find(
    (c) => c.name === testCategory,
  );
  categoryId = category.id;
});

// 2. Add a brand with the name TEST_BRAND
test("Add brand TEST_BRAND", async () => {
  const res = await request(app)
    .post("/brands")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({ name: testBrand });

  expect(res.statusCode).toBe(200);
  expect(res.body.status).toBe("success");

  // Fetch brand id for later tests
  const brands = await request(app)
    .get("/brands")
    .set("Authorization", `Bearer ${adminToken}`);
  const brand = brands.body.data.result.find((b) => b.name === testBrand);
  brandId = brand.id;
});

// 3. Add a product TEST_PRODUCT linked to TEST_BRAND and TEST_CATEGORY
test("Add product TEST_PRODUCT", async () => {
  const res = await request(app)
    .post("/products")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({
      name: testProduct,
      description: "Test product description",
      unitPrice: 99.99,
      quantity: 10,
      brandId,
      categoryId,
    });
    
  expect(res.statusCode).toBe(200);
  expect(res.body.status).toBe("success");
  productId = res.body.data.nProduct.id;
});

// 4. GET TEST_PRODUCT with brand and category name
test("Get TEST_PRODUCT with brand and category name", async () => {
  const res = await request(app)
    .get(`/products/${productId}`)
    .set("Authorization", `Bearer ${adminToken}`);

  expect(res.statusCode).toBe(200);
  expect(res.body.data.productById.name).toBe(testProduct);
  expect(res.body.data.productById.brand).toBe(testBrand);
  expect(res.body.data.productById.category).toBe(testCategory);
});

// 5. Change TEST_CATEGORY to TEST_CATEGORY2
test("Rename TEST_CATEGORY to TEST_CATEGORY2", async () => {
  const res = await request(app)
    .put(`/categories/${categoryId}`)
    .set("Authorization", `Bearer ${adminToken}`)
    .send({ name: "TEST_CATEGORY2" });

  expect(res.statusCode).toBe(200);
  expect(res.body.status).toBe("success");
});

// 6. Change TEST_BRAND to TEST_BRAND2
test("Rename TEST_BRAND to TEST_BRAND2", async () => {
  const res = await request(app)
    .put(`/brands/${brandId}`)
    .set("Authorization", `Bearer ${adminToken}`)
    .send({ name: "TEST_BRAND2" });

  expect(res.statusCode).toBe(200);
  expect(res.body.status).toBe("success");
});

// 7. GET TEST_PRODUCT again, verify updated category and brand names
test("Get TEST_PRODUCT with updated brand and category names", async () => {
  const res = await request(app)
    .get(`/products/${productId}`)
    .set("Authorization", `Bearer ${adminToken}`);

  expect(res.statusCode).toBe(200);
  expect(res.body.data.productById.name).toBe(testProduct);
  expect(res.body.data.productById.brand).toBe("TEST_BRAND2");
  expect(res.body.data.productById.category).toBe("TEST_CATEGORY2");
});

// 8. Delete TEST_PRODUCT (soft delete)
test("Delete TEST_PRODUCT", async () => {
  const res = await request(app)
    .delete(`/products/${productId}`)
    .set("Authorization", `Bearer ${adminToken}`);

  expect(res.statusCode).toBe(200);
  expect(res.body.status).toBe("success");
});

// Cleanup after all tests, delete test category and brand
afterAll(async () => {
  await request(app)
    .delete(`/categories/${categoryId}`)
    .set("Authorization", `Bearer ${adminToken}`);
  await request(app)
    .delete(`/brands/${brandId}`)
    .set("Authorization", `Bearer ${adminToken}`);
  await sequelize.close();  
});
