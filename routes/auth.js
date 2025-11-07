const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const asyncHandler = require("../middleware/asyncHandler");

router.get("/login", asyncHandler(AuthController.showLogin));
router.post("/login", asyncHandler(AuthController.login));
router.get("/logout", asyncHandler(AuthController.logout));

module.exports = router;
