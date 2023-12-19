const Order = require("../models/orderModel");
const catchAsyncErrors = require("../Middleware/catchAsyncErrors");

// Create new Order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const sellerId = req.params.id;
  const { orderItems } = req.body;

  const order = await Order.create({
    seller_id : sellerId,
    orderItems,
    user: req.user._id,
  });

  await order.save({ validateBeforeSave: false });

  res.status(201).json({
    success: true,
    order,
  });
});
