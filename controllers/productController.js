const Product = require("../models/productModel");
const User = require("../models/userModel");
const Catalouge = require("../models/catalogModel");
const CatchAsyncErrors = require("../Middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");

// Create Product  ------> Seller

exports.createProduct = CatchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;

  const user = await User.findById(req.user.id);

  const { name, price } = req.body;

  const product = await Product.create({
    name,
    price,
    user,
  });

  await product.save({ validateBeforeSave: false });

  res.status(201).json({
    success: true,
    product,
  });
});

// Create Catalouge ----> Seller

exports.createCataloge = CatchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const { products } = req.body;

  const catalouge = await Catalouge.find({ seller_id: user._id });

  if (catalouge && catalouge.length != 0) {
    return next(new ErrorHandler("Catalog Already Exists", 500));
  }

  const catalog = await Catalouge.create({
    seller_id: user.id,
    products,
  });

  await catalog.save({ validateBeforeSave: false });

  res.status(201).json({
    success: true,
    catalog,
  });
});

// Get Catalouge ---> buyer

exports.getCatalouge = CatchAsyncErrors(async (req, res) => {
  const seller = req.params.id;

  const catalouge = await Catalouge.find({ seller_id: seller });
  if (!catalouge) {
    return next(new ErrorHandler("No Catalouge Exists!!", 404));
  }
  res.status(201).json({
    success: true,
    catalouge,
  });
});

// Update Catalog ---> Seller

exports.updateCatalog = CatchAsyncErrors(async (req, res, next) => {
  const { items } = req.body;
  const user = req.user._id;

  items.forEach(async (item) => {
    const catalog = await Catalouge.find({ seller_id: user });
    // console.log(catalog[0].products);

    // Check if Item alreadu exists in the catalog
    const itemExist = catalog[0].products.find((i) => i.name === item.name);

    if (!itemExist) {
      catalog[0].products.push(item);
    }

    await catalog[0].save({ validateBeforeSave: false });
  });

  res.status(200).json({
    success: true,
    messge: "Catalog Updated Successfully!!",
  });
});

// Get All Products ----> Testing

exports.getAllProducts = CatchAsyncErrors(async (req, res) => {
  const productCount = await Product.countDocuments();
  const product = await Product.find();

  res.status(200).json({
    success: true,
    productCount: productCount,
    product,
  });
});
