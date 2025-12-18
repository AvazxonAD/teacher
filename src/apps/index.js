const express = require("express");

const router = express.Router();

const AuthRoutes = require("./auth/index");
const ArticleRoutes = require("./article/index");
const FileRoutes = require("./file/index");
const BookRoutes = require("./book/index");

router.use("/auth", AuthRoutes);
router.use("/article", ArticleRoutes);
router.use("/file", FileRoutes);
router.use("/book", BookRoutes);

module.exports = router;
