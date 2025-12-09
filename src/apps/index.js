const express = require("express");

const router = express.Router();

// import routes
const AuthRoutes = require("./auth/index");

// Auth routes
router.use("/auth", AuthRoutes);

module.exports = router;
