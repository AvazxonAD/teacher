const express = require("express");

const router = express.Router();

const AuthRoutes = require("./auth/index");
const ArticleRoutes = require("./article/index");

router.use("/auth", AuthRoutes);
router.use("/article", ArticleRoutes);

module.exports = router;
