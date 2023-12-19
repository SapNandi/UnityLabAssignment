const ErrorHandler = require("../utils/ErrorHandler");
const CatchAsyncErrors = require("../Middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const User = require("../models/userModel");
const Order = require("../models/orderModel");

// Register a user

exports.registerUser = CatchAsyncErrors(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    role
  });
  sendToken(user, 201, res);
});

// Login User
exports.loginUser = CatchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter Email and Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Email and Password", 401));
  }

  const isPassword = await user.comparePassword(password);

  if (!isPassword) {
    return next(new ErrorHandler("Invalid Email and Password", 401));
  }

  sendToken(user, 200, res);
});

// Logout User

exports.logoutUser = CatchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out Successfully!!",
  });
});

// Get My orders ---> Seller

exports.getMyOrders = CatchAsyncErrors(async (req, res, next) => {
  const user = req.user._id;
  const order = await Order.find({seller_id : user});

  if (!order) {
    return next(new ErrorHandler("No Orders Found", 400));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// Get All Sellers ---> Buyer

exports.getAllSellers = CatchAsyncErrors(async (req, res, next) => {
  const seller = await User.find({ role: "seller" });

  if (!seller) {
    return next(new ErrorHandler("No Sellers Found!!", 400));
  }

  res.status(200).json({
    success: true,
    seller,
  });
});
