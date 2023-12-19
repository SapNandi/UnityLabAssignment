const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getMyOrders,
  getAllSellers,
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../Middleware/auth");

const router = express.Router();

// Common Routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser); // Logging Out User

// Buyer Routes
router
  .route("/buyer/seller_list")
  .get(isAuthenticatedUser, authorizeRoles("buyer"), getAllSellers);
  
// Seller Routes
router
  .route("/seller/orders")
  .get(isAuthenticatedUser, authorizeRoles("seller"), getMyOrders);

module.exports = router;
