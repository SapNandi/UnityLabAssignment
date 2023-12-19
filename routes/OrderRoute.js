const express = require("express");
const {
  newOrder,
} = require("../controllers/orderController");
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../Middleware/auth");

router.route("/buyer/createOrder/:id").post(isAuthenticatedUser, authorizeRoles("buyer"), newOrder);

module.exports = router;
