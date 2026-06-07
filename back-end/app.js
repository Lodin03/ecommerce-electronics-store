var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const isAuth = require("./middleware/authMiddleware");

var indexRouter = require("./routes/index");
var initRouter = require("./routes/init");
var authRouter = require("./routes/auth");
var cartRouter = require("./routes/cart");
var orderRouter = require("./routes/order");
var categoryRouter = require("./routes/category");
var brandRouter = require("./routes/brand");
var productRouter = require("./routes/product");
var searchRouter = require("./routes/search");
var userRouter = require("./routes/user");
var roleRouter = require("./routes/role");

var app = express();

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-Commerce API",
      version: "1.0.0",
      description: "API documentation for the E-Commerce backend",
    },
    // Tags in alphabetical order
    tags: [
      { name: "Authentication" },
      { name: "Brands" },
      { name: "Cart" },
      { name: "Categories" },
      { name: "Initialization" },
      { name: "Orders" },
      { name: "Products" },
      { name: "Roles" },
      { name: "Search" },
      { name: "Users" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/", indexRouter);
app.use("/init", initRouter);
app.use("/auth", authRouter);
app.use("/cart", isAuth, cartRouter);
app.use("/orders", isAuth, orderRouter);
app.use("/categories", isAuth, categoryRouter);
app.use("/brands", isAuth, brandRouter);
app.use("/products", isAuth, productRouter);
app.use("/search", isAuth, searchRouter);
app.use("/users", isAuth, userRouter);
app.use("/roles", isAuth, roleRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
