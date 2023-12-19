const express = require("express");
const {
  createProduct,
  getAllProducts,
  createCataloge,
  getCatalouge,
  updateCatalog,
} = require("../controllers/productController");

const { isAuthenticatedUser, authorizeRoles } = require("../Middleware/auth");

const router = express.Router();

router.route("/product").get(getAllProducts);
router.route("/buyer/seller_catalog/:id").get(isAuthenticatedUser, authorizeRoles("buyer"), getCatalouge);

router
  .route("/product/new")
  .post(isAuthenticatedUser, authorizeRoles("seller"), createProduct);

router
  .route("/seller/create_catalog")
  .post(isAuthenticatedUser, authorizeRoles("seller"), createCataloge);

router
  .route("/seller/update_catalog")
  .post(isAuthenticatedUser, authorizeRoles("seller"), updateCatalog);

module.exports = router;
