const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();

// Error Handler Middleware
const errorMiddleware = require("./Middleware/error");

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Route Imports
const productRoute = require("./routes/ProductRoute");
const userRoute = require("./routes/UserRoute");
const orderRoute = require("./routes/OrderRoute");

app.use("/api/v1", productRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", orderRoute);

// Error Middleware
app.use(errorMiddleware);

module.exports = app;
