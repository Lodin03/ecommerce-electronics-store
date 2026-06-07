require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const ejsLayouts = require("express-ejs-layouts");
const session = require("express-session");
const isAuth = require("./middleware/authMiddleware");

var authRouter = require("./routes/auth");
var productRouter = require("./routes/product");
var brandRouter = require("./routes/brand");
var categoryRouter = require("./routes/category");
var roleRouter = require("./routes/role")
var usersRouter = require("./routes/user");
var orderRouter = require("./routes/order");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 2 * 60 * 60 * 1000 }, // 2 hours matching backend JWT
  }),
);
app.use(ejsLayouts);
app.set("layout", "layout");

app.use("/", authRouter);
app.use("/products", isAuth, productRouter);
app.use("/brands", isAuth, brandRouter);
app.use("/categories", isAuth, categoryRouter);
app.use("/roles", isAuth, roleRouter);
app.use("/users", isAuth, usersRouter);
app.use("/orders", isAuth, orderRouter);

// Redirects any random unknown routes to login route
app.use(function (req, res) {
  res.redirect("/");
});

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
